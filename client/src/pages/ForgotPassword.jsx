import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPaperPlane, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { forgotPassword, clearPasswordReset, clearError } from '../store/slices/authSlice';
import quwwaLogo from '../assets/images/header.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error, passwordResetSent } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear previous errors and states when component mounts
    dispatch(clearError());
    dispatch(clearPasswordReset());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(forgotPassword(email));
    }
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img src={quwwaLogo} alt="Quwwa Health Logo" className="h-12 mx-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Your Password?
          </h2>
          <p className="mt-2 text-center text-sm text-[#848383]">
            No worries! Enter your email below and we'll send you a reset link.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 pl-10 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#54BD95] focus:border-[#54BD95] focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
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
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <Link to="/auth" className="font-medium text-[#54BD95] hover:text-green-500">
            Remembered your password? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 