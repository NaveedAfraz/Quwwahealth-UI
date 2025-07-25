import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPaperPlane, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import quwwaLogo from '../assets/images/header.png';
import axios from 'axios';
import OtpInput from './otp';
import { config } from '../config/config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState('enter-email');
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${config.API_BASE_URL}/forgot-password`, { email });
      setMessage(response.data.message);
      setOpenSnackbar(true);
      setStep('enter-otp');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred.');
      console.error('Error sending password reset email:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleOtpSubmit = async (otp) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${config.API_BASE_URL}/verify-otp`, { email, otp });
      setLoading(false);
      setMessage(response.data);
      console.log(response.data);
      if (response.data.success) {
        setTimeout(() => navigate('/reset-password', { state: { email } }), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (passwordResetSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <img src={quwwaLogo} alt="Quwwa Health Logo" className="h-12 mx-auto mb-6" />
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <FaCheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset Email Sent
          </h2>
          <p className="mt-2 text-sm text-[#848383]">
            If an account with that email exists, a password reset link has been sent. Please check your inbox.
          </p>
          <div className="mt-8">
            <Link
              to="/auth"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54BD95] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54BD95]"
            >
              <FaArrowLeft className="h-4 w-4 mr-2" />
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }


  const renderEmailStep = () => (
    <>
      <div>
        <img src={quwwaLogo} alt="Quwwa Health Logo" className="h-12 mx-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Your Password?
        </h2>
        <p className="mt-2 text-center text-sm text-[#848383]">
          No worries! Enter your email and we'll send you an OTP to reset it.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
        <div className="rounded-md shadow-sm">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 pl-10 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#54BD95] focus:border-[#54BD95] focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading || !email}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54BD95] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54BD95] disabled:opacity-50"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaPaperPlane className="h-5 w-5 text-green-300" />
            </span>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </div>
      </form>
    </>
  );

  // Renders the view for entering the OTP
  const renderOtpStep = () => (
    <>
      <div>
        <img src={quwwaLogo} alt="Quwwa Health Logo" className="h-12 mx-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Enter OTP
        </h2>
        <p className="mt-2 text-center text-sm text-[#848383]">
          A 6-digit code has been sent to <span className="font-semibold">{email}</span>.
        </p>
      </div>
      <div className="mt-8">
        <OtpInput length={6} onComplete={handleOtpSubmit} />
        {loading && <p className="text-center mt-4 text-sm text-gray-600">Verifying...</p>}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => { setStep('enter-email'); setError(''); }}
          className="font-medium text-[#54BD95] hover:text-green-500 flex items-center justify-center mx-auto"
        >
          <FaArrowLeft className="h-4 w-4 mr-2" />
          Use a different email
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {step === 'enter-email' ? renderEmailStep() : renderOtpStep()}

        {step === 'enter-email' && (
          <div className="text-sm text-center">
            <Link to="/auth" className="font-medium text-[#54BD95] hover:text-green-500">
              Remembered your password? Login
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword; 