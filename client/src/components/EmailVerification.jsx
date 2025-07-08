import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { verifyEmail, resendVerificationEmail, clearEmailVerification } from '../store/slices/authSlice';
import quwwaLogo from '../assets/images/header.png';

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, emailVerificationSuccess, emailVerificationSent } = useSelector((state) => state.auth);

  useEffect(() => {
    // Clear any previous verification states
    dispatch(clearEmailVerification());

    // If there's a token in URL, verify it
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [dispatch, token]);

  const handleResendVerification = async (e) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    await dispatch(resendVerificationEmail(email));
  };

  const handleBackToLogin = () => {
    navigate('/auth');
  };

  // If there's a token and verification is successful
  if (token && emailVerificationSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img src={quwwaLogo} alt="Quwwa Health Logo" className="h-12 mx-auto mb-6" />
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <FaCheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Email Verified!
            </h2>
            <p className="mt-2 text-sm text-[#848383]">
              Your email has been successfully verified. You can now log in to your account.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={handleBackToLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54BD95] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54BD95]"
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If there's a token but verification failed
  if (token && error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img src={quwwaLogo} alt="Quwwa Health Logo" className="h-12 mx-auto mb-6" />
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <FaExclamationTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Verification Failed
            </h2>
            <p className="mt-2 text-sm text-[#848383]">
              {error || 'The verification link is invalid or has expired.'}
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={handleBackToLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54BD95] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54BD95]"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Resend verification email form
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src={quwwaLogo} alt="Quwwa Health Logo" className="h-12 mx-auto mb-6" />
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <FaEnvelope className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-[#848383]">
            {emailVerificationSent 
              ? 'A new verification email has been sent to your email address.'
              : 'Please check your email for a verification link or request a new one.'
            }
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <FaExclamationTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {emailVerificationSent && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <FaCheckCircle className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  Verification email sent successfully! Please check your inbox.
                </p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleResendVerification}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#54BD95] focus:border-[#54BD95] focus:z-10 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading || !email}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54BD95] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54BD95] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Resend Verification Email'}
            </button>
            
            <button
              type="button"
              onClick={handleBackToLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54BD95]"
            >
              <FaArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-xs text-[#A6A6A6]">
            Didn't receive the email? Check your spam folder or try a different email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 