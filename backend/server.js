require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Resend } = require("resend");
const cookieParser = require("cookie-parser");
const db = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const admin = require("./firebaseAdmin");
const app = express();
const PORT = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
const blogRoutes = require("./routes/blogs");
const uploadRoutes = require("./routes/upload");
const testimonialRoutes = require("./routes/testimonialRoutes");
const authMiddleware = require("./middleware/authMiddleware");
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://www.quwwahealth.com/",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const resend = new Resend(process.env.RESEND_API_KEY);

// Create API router
const apiRouter = express.Router();

// Mount all API routes under /api
app.use("/api", apiRouter);

// Mount blog routes under /api
apiRouter.use("/blogs", blogRoutes);

// Mount upload routes under /api
apiRouter.use("/upload", uploadRoutes);

// Mount testimonial routes under /api
apiRouter.use("/testimonials", testimonialRoutes);
apiRouter.use("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});
apiRouter.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  try {
    await resend.emails.send({
      from: `QuwwaHealth Contact Form <no-reply@quwwahealth.com>`,
      to: [process.env.RECEIVER_EMAIL],
      reply_to: email,
      subject: `New Contact Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Contact Message from QuwwaHealth</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 10px;">
            ${message.replace(/\n/g, "<br/>")}
          </blockquote>
          <hr/>
          <p style="font-size: 12px; color: #888;">You can reply to this message directly to contact the sender.</p>
        </div>
      `,
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// Auth: verify Firebase token, set session cookie

apiRouter.post("/auth/register", async (req, res) => {
  const {
    email,
    password,
    schoolName,
    country,
    phoneNumber,
    address,
    city,
    state,
    zipCode,
  } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    console.log(existingUsers);
    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data = await db.query(
      `INSERT INTO users (email, password, school_name, country, phone_number, address, city, state, zip_code) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        hashedPassword,
        schoolName || null,
        country || null,
        phoneNumber || null,
        address || null,
        city || null,
        state || null,
        zipCode || null,
      ]
    );

    const jwtToken = jwt.sign(
      { id: data.insertId, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("auth_token", jwtToken, {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      path: "/",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        email,
        schoolName,
        country,
        phoneNumber,
        address,
        city,
        state,
        zipCode,
      },
      // token: jwtToken,
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Failed to register user", success: false });
  }
});

apiRouter.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = users[0];
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // Check if we're in production (Vercel/Render)
    const isProduction = process.env.NODE_ENV === "production";

    res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: isProduction, // Use secure cookies in production (HTTPS only)
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: isProduction ? "none" : "lax", // Required for cross-site cookies in production
        path: "/",
        //domain: isProduction ? '.quwwahealth.com' : undefined, // Only set domain in production
      })
      .status(200)
      .json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to login", error });
  }
});

// Route for frontend to check authentication status
apiRouter.get("/auth/check", authMiddleware, async (req, res) => {
  const User = req.user;
  console.log("User", User);
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      User.email,
    ]);
    const fetchUser = rows[0];
    res.json({ authenticated: true, user: fetchUser });
  } catch (error) {
    console.error("Auth check error:", error);
    res.status(500).json({ message: "Failed to check authentication", error });
  }
});

// Logout route to clear the cookie
apiRouter.post("/auth/logout", (req, res) => {
  console.log("Logout request received");
  // Clear the cookie with the exact same options used when setting it
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    //domain: isProduction ? '.quwwahealth.com' : undefined
  });

  console.log("Auth token cookie cleared");
  res.json({ success: true, message: "Successfully logged out" });
});

apiRouter.post("/auth/session", async (req, res) => {
  const { idToken } = req.body;
  console.log(idToken);
  if (!idToken) return res.status(400).json({ message: "No idToken provided" });

  try {
    // 1. Verify the Firebase token
    const decoded = await admin.auth().verifyIdToken(idToken);
    const email = decoded.email;
    const firebase_uid = decoded.uid;

    // 2. Check if user exists in MySQL
    let [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    let user;
    console.log(rows);
    if (rows.length === 0) {
      // 3. If not, create new user in MySQL
      await db.query(
        "INSERT INTO users (email,password, firebase_uid) VALUES (?, ?, ?)",
        [email, "", firebase_uid]
      );
      // Fetch the new user
      [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
      user = rows[0];
    } else {
      user = rows[0];
    }
    console.log("User", user);
    // 4. Set session cookie and return user info
    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true, // Always use secure in production, will be false in development
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "none", // Required for cross-site cookies
      path: "/",
    };

    // In development, we need to adjust some cookie options
    if (process.env.NODE_ENV === "development") {
      cookieOptions.secure = false;
      cookieOptions.sameSite = "lax";
    }

    console.log("Setting cookie with options:", cookieOptions);
    res.cookie("auth_token", jwtToken, cookieOptions);
    return res.json({ message: "Session cookie set", user });
  } catch (err) {
    console.error("Token verify error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
});

apiRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      // To prevent user enumeration, we send a generic success message even if the user doesn't exist.
      return res.status(200).json({
        message: "If an account with this email exists, an OTP has been sent.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await db.query(
      "INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)",
      [email, otp, expiresAt]
    );

    await resend.emails.send({
      from: "QuwwaHealth <no-reply@quwwahealth.com>",
      to: [email],
      subject: "Your Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password. Use the following One-Time Password (OTP) to proceed:</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${otp}</p>
          <p>This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email.</p>
          <hr/>
          <p style="font-size: 12px; color: #888;">Thank you for using QuwwaHealth.</p>
        </div>
      `,
    });

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

apiRouter.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM otps WHERE email = ? AND otp = ?",
      [email, otp]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    const otpData = rows[0];
    const isExpired = new Date() > new Date(otpData.expires_at);

    if (isExpired) {
      // Clean up expired OTP
      await db.query("DELETE FROM otps WHERE id = ?", [otpData.id]);
      return res.status(400).json({ message: "OTP has expired." });
    }

    // OTP is verified, clean it up to prevent reuse
    await db.query("DELETE FROM otps WHERE id = ?", [otpData.id]);

    res
      .status(200)
      .json({ message: "OTP verified successfully.", success: true });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Failed to verify OTP.", success: false });
  }
});

apiRouter.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Email and new password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const [result] = await db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log(result);

    res
      .status(200)
      .json({ message: "Password updated successfully.", success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    res
      .status(500)
      .json({ message: "Failed to reset password.", success: false });
  }
});
// All routes are already mounted under /api via apiRouter
app.listen(PORT, async () => {
  try {
    db.createDatabaseAndTables();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
});
