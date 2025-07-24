import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
//import { resetPassword, clearPasswordReset, clearError } from '../store/slices/authSlice';
import quwwaLogo from '../assets/images/header.png';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      // If no email is passed, redirect to the forgot password page
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setPasswordsMatch(true);

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3006/reset-password', {
        email,
        newPassword: password,
      });
      console.log(response.data);
      if (response.data.success) {
        setLoading(false);
        setPasswordResetSuccess(true);
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/auth/login');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password.');
      setLoading(false);
    }
  };

  if (passwordResetSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center p-4">
        <div>
          <img src={quwwaLogo} alt="Quwwa Health Logo" className="h-12 mx-auto mb-6" />
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <FaCheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Password Reset!</h2>
          <p className="mt-2 text-sm text-[#848383]">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <div className="mt-8">
            <Link
              to="/auth/login"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54BD95] hover:bg-green-600"
            >
              Proceed to Login
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
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-[#848383]">
            Please enter your new password below.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        {!passwordsMatch && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">Passwords do not match.</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#54BD95] focus:border-[#54BD95] sm:text-sm"
                placeholder="New password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm New Password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#54BD95] focus:border-[#54BD95] sm:text-sm"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !password || !confirmPassword}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54BD95] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54BD95] disabled:opacity-50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaLock className="h-5 w-5 text-green-300" />
              </span>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 