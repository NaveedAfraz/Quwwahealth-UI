import React from 'react';

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="container">
        <h2>Get In Touch</h2>
        <div className="contact-info">

          {/* Existing Contact Info */}
          <div className="contact-item">
            <h3>Email</h3>
            <p>info@quwwahealth.com</p>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>

          {/* Added Headquarter Office Address */}
          <div className="contact-item">
            <h3>Headquarter Office</h3>
            <p>9/2 Immamigate agrasen choraha, Syed complex, Bhopal</p>
          </div>

          {/* Added Regional Office Address */}
          <div className="contact-item">
            <h3>Regional Office</h3>
            <p>Gwalior district, old Shivpuri, alpro physio clinic, Madhya Pradesh pin 📍 473551</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;