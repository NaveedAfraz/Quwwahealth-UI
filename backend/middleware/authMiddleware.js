const jwt = require("jsonwebtoken");
const admin = require("../firebaseAdmin");
const db = require("../db");

function authenticateToken(req, res, next) {
  const token = req.cookies.auth_token;
  console.log("Cookies:", req.cookies);
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No auth token" });
  }

  // Try Firebase Admin first
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedFirebaseToken) => {
      req.user = decodedFirebaseToken;
      console.log("✅ Firebase token verified");
      next();
    })
    .catch((firebaseErr) => {
      console.warn(
        "⚠️ Firebase token verification failed, falling back to JWT:",
        firebaseErr.message
      );

      // Fallback to custom JWT
      jwt.verify(token, process.env.JWT_SECRET, (jwtErr, decodedJWT) => {
        if (jwtErr) {
          console.error("❌ Invalid JWT:", jwtErr.message);
          return res.status(401).json({ message: "Invalid token" });
        }
        console.log("✅ JWT verified");
        req.user = decodedJWT;
        next();
      });
    });
}
module.exports = authenticateToken;
