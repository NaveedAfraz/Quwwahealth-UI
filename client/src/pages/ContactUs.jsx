import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios
import { FiMail, FiMapPin, FiTwitter, FiInstagram, FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';
import { X } from "lucide-react";
import { toast } from "sonner"
const ContactUs = () => {
  // State for the form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  // State to manage the form's submission status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, subject: e.target.value }));
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // The backend server URL
      // const API_URL = 'http://localhost:5000/api/send-email';

      // // The backend expects `visitorEmail`. Let's create the correct payload.
      // const payload = {
      //   ...formData,
      //   visitorEmail: formData.email,
      // };

      // // Make the POST request to the server
      // await axios.post(API_URL, payload);

      // If the request is successful
      setSuccess(true);
      toast("Form submitted successfully!");
    } catch (err) {
      // If there's an error, update the error state
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      // Stop loading regardless of outcome
      setLoading(false);
    }
  };

  // Reset the form to its initial state
  const handleResetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
    setSuccess(false);
    setError(null);
  }

  return (
    <div className="bg-[#F7FBEF] py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-white to-green-100">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 ">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900">Contact Us</h1>
        <p className="mt-4 text-lg text-[#848383]">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      {/* Contact Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

        {/* Left Side: Contact Info */}
        <div className="w-full md:w-1/3 bg-[#54BD95] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          <div>
            <h2 className="text-3xl font-bold mb-2">Contact Information</h2>
            <p className="text-green-100">
              For inquiries or to join our movement towards healthier schools, reach out at:
              <br />
              <span className="mt-2 inline-block">
                <strong>Headquarter Office:</strong> 9/2 Immamigate, Agrasen Choraha, Syed Complex, Bhopal
              </span>
              <br />
              <span className="mt-2 inline-block">
                <strong>Regional Office:</strong> Gwalior District, Alpro Physio Clinic,
              </span>
              <br />
              <span className="inline-block">
               Bhopal Pin Code: 462001
              </span>
            </p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center space-x-4">
                <FiMail className="h-6 w-6" />
                <span>info@quwwahealth.com</span>
              </div>
              <div className="flex items-start space-x-4">
                <FiMapPin className="h-6 w-6 mt-1" />
                <span>
                  9/2 Immamigate, Agrasen Choraha, Syed Complex, Bhopal
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mt-12">
            <a href="https://x.com/Quwwahealth?t=ZXp9QQMRDKK-DECQhXtFiQ&s=09" className="w-10 h-10 cursor-pointer z-20 bg-black bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition">
              <X />
            </a>
            <a href="https://www.instagram.com/quwwahealth?igsh=MXVyYTllbjE0bTFucw==" className="w-10 h-10 cursor-pointer z-20 bg-black bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition">
              <FiInstagram />
            </a>
            {/* <a href="#" className="w-10 h-10 bg-black bg-opacity-20 rounded-full flex items-center cursor-pointer z-20 justify-center hover:bg-opacity-30 transition">
              <FaDiscord />
            </a> */}
          </div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-400 rounded-full opacity-50"></div>
          <div className="absolute -bottom-24 -right-4 w-48 h-48 bg-green-800 rounded-full opacity-40"></div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-2/3 p-8 sm:p-12">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FiCheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-[#191A15]">Message Sent!</h3>
              <p className="mt-2 text-[#848383]">Thank you for contacting us. We will get back to you shortly.</p>
              <button
                onClick={handleResetForm}
                className="mt-6 bg-[#54BD95] text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6" role="alert">
                  <div className="flex">
                    <div className="py-1"><FiAlertCircle className="h-6 w-6 text-red-500 mr-4" /></div>
                    <div>
                      <p className="font-bold">Submission Failed</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} required className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:border-[#54BD95] py-2" />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:border-[#54BD95] py-2" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:border-[#54BD95] py-2" />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:border-[#54BD95] py-2" />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700">Select Subject?</label>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  <div className="flex items-center"><input type="radio" name="subject" value="General Inquiry" checked={formData.subject === 'General Inquiry'} onChange={handleRadioChange} className="h-4 w-4 text-[#54BD95] focus:ring-[#54BD95] border-gray-300" /><label htmlFor="general" className="ml-2 text-sm text-[#848383]">General Inquiry</label></div>
                  <div className="flex items-center"><input type="radio" name="subject" value="Sports Day" checked={formData.subject === 'Sports Day'} onChange={handleRadioChange} className="h-4 w-4 text-[#54BD95] focus:ring-[#54BD95] border-gray-300" /><label htmlFor="sports-day" className="ml-2 text-sm text-[#848383]">Sports Day</label></div>
                  <div className="flex items-center"><input type="radio" name="subject" value="Health Report" checked={formData.subject === 'Health Report'} onChange={handleRadioChange} className="h-4 w-4 text-[#54BD95] focus:ring-[#54BD95] border-gray-300" /><label htmlFor="health-report" className="ml-2 text-sm text-[#848383]">Health Report</label></div>
                  <div className="flex items-center"><input type="radio" name="subject" value="Healthy Canteen" checked={formData.subject === 'Healthy Canteen'} onChange={handleRadioChange} className="h-4 w-4 text-[#54BD95] focus:ring-[#54BD95] border-gray-300" /><label htmlFor="healthy-canteen" className="ml-2 text-sm text-[#848383]">Healthy Canteen</label></div>
                  <div className="flex items-center"><input type="radio" name="subject" value="School PE" checked={formData.subject === 'School PE'} onChange={handleRadioChange} className="h-4 w-4 text-[#54BD95] focus:ring-[#54BD95] border-gray-300" /><label htmlFor="school-pe" className="ml-2 text-sm text-[#848383]">School PE</label></div>
                  <div className="flex items-center"><input type="radio" name="subject" value="Sports Program" checked={formData.subject === 'Sports Program'} onChange={handleRadioChange} className="h-4 w-4 text-[#54BD95] focus:ring-[#54BD95] border-gray-300" /><label htmlFor="sports-program" className="ml-2 text-sm text-[#848383]">Sports Program</label></div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <input type="text" id="message" value={formData.message} onChange={handleInputChange} placeholder='Write your message..' required className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:border-[#54BD95] py-2" />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#54BD95] text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center max-w-2xl mx-auto mt-24">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Join the Movement Towards Healthier Schools!</h2>
        <p className="mt-4 text-lg text-[#848383]">
          Be a part of this transformative initiative aimed at fostering healthy, active students.
        </p>
        <div className="mt-2 flex justify-center">
          <svg width="285" height="40" viewBox="0 0 285 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M181.535 0.697709C161.338 1.32266 141.155 2.37085 121.004 3.84229C102.719 4.16634 84.4297 4.49039 66.1442 4.81443C46.0797 5.17155 26.0153 5.52535 5.95408 5.88247C4.0131 5.91553 1.0074 7.34068 0.709802 9.49328C0.382448 11.8674 3.31871 12.2642 4.97202 12.2378C18.01 12.0063 31.0479 11.7748 44.0858 11.5434C38.6597 12.2345 33.2402 12.952 27.8207 13.7026C25.9425 13.9638 23.3204 14.8434 22.7219 16.8968C22.1862 18.7286 23.8593 20.0281 25.635 20.0612C55.7449 20.577 85.8582 21.0962 115.968 21.612C122.376 21.7211 128.785 21.8335 135.193 21.9426C125.974 22.9512 116.768 24.1118 107.589 25.4245C93.1955 27.4878 78.8614 29.9347 64.5901 32.7222C63.0492 33.0231 60.8636 34.3722 60.6288 36.1015C60.4006 37.7548 62.2226 38.8361 63.6841 38.8493C97.9273 39.1469 132.171 39.4478 166.414 39.7454C176.069 39.8281 185.721 39.914 195.376 39.9967C197.588 40.0165 200.425 39.385 201.54 37.2126C202.535 35.2683 200.67 33.6513 198.769 33.6348C165.805 33.3471 132.842 33.0595 99.8782 32.7718C100.797 32.6329 101.713 32.4907 102.633 32.3551C115.089 30.5101 127.588 28.946 140.113 27.6664C165.177 25.1071 190.354 23.6819 215.547 23.4009C216.661 23.3876 217.788 23.381 218.913 23.3744C231.683 23.5926 244.45 23.8142 257.22 24.0324C259.429 24.0688 262.276 23.4075 263.383 21.2483C264.402 19.2643 262.497 17.7466 260.612 17.6705C247.581 17.1481 234.536 16.9232 221.495 16.9993C204.423 16.705 187.351 16.414 170.279 16.1197C140.169 15.6039 110.056 15.0847 79.946 14.5689C77.5189 14.5259 75.0886 14.4863 72.6615 14.4433C88.4274 12.7668 104.22 11.3483 120.032 10.1943C152.995 9.60901 185.962 9.02705 218.926 8.44178C238.99 8.08467 259.055 7.73086 279.116 7.37374C280.958 7.34068 283.663 6.07756 284.215 4.17956C284.757 2.32456 283.071 1.08127 281.302 1.01514C248.06 -0.221528 214.779 -0.330646 181.535 0.697709Z" fill="#F3F25B" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
