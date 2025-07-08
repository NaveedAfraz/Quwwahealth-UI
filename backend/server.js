// server.js (Using Resend)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend'); // Import the Resend library

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to send email
app.post('/api/send-email', async (req, res) => {
    try {
        // Destructure all fields from the React form's formData
        const { firstName, lastName, email, phone, subject, message } = req.body;

        // Validation to ensure required fields are present
        if (!firstName || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'First name, email, subject, and message are required.' });
        }

        // Create a more detailed and formatted HTML body for the email
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">New Contact Form Submission</h2>
                <p>You have received a new message from your website's contact form.</p>
                <hr>
                <h3 style="color: #555;">Sender's Details:</h3>
                <ul>
                    <li><strong>Name:</strong> ${firstName} ${lastName || ''}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
                </ul>
                <h3 style="color: #555;">Message Details:</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
                    <p>${message}</p>
                </div>
            </div>
        `;

        // Send the email using Resend
        const { data, error } = await resend.emails.send({
            from: 'Quwwahealth Contact Form <onboarding@resend.dev>', // For testing. Replace with your verified domain email in production.
            to: [process.env.OWNER_EMAIL], // Your personal email to receive the message
            subject: `New Contact Form Submission: ${subject}`, // More descriptive subject
            html: emailHtml, // Use the new formatted HTML
            reply_to: email, // Set the reply-to to the visitor's email
        });

        if (error) {
            console.error('Error sending email:', error);
            return res.status(400).json({ success: false, error });
        }

        console.log('Email sent successfully:', data.id);
        res.status(200).json({ success: true, message: 'Email sent successfully', messageId: data.id });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
