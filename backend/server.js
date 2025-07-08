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
        // Get the visitor's email and message from the form submission
        const { visitorEmail, subject, text } = req.body;

        if (!visitorEmail || !subject || !text) {
            return res.status(400).json({ success: false, message: 'Visitor email, subject, and text are required.' });
        }

        // Send the email using Resend
        const { data, error } = await resend.emails.send({
            from: 'Quwwahealth Contact <onboarding@resend.dev>', // This can be any email from your verified domain
            to: [process.env.OWNER_EMAIL], // Your personal email to receive the message
            subject: subject,
            html: `
                <h3>New message from ${visitorEmail}</h3>
                <p>${text}</p>
            `,
            reply_to: visitorEmail, // Set the reply-to to the visitor's email
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
