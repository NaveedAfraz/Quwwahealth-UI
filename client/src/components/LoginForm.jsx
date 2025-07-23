import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';
import { clearError } from '../store/slices/authSlice';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import quwwaLogo from '../assets/images/header.png';

const LoginForm = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Clear error when component mounts
    dispatch(clearError());
  }, [dispatch]);

  // Check if error is related to email verification
  const isEmailVerificationError = error && (
    error.includes('verify your email') || 
    error.includes('email not verified') ||
    error.includes('Please verify your email')
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError(error.message);
      if (error.code === 'auth/email-not-verified') {
        setShowResendVerification(true);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResendVerificationEmail = async () => {
    setResendLoading(true);
    try {
      // Firebase automatically sends verification email on sign up
      // This is just a fallback in case user didn't receive it
      await auth.currentUser.sendEmailVerification();
      setShowResendVerification(false);
      setError('Verification email sent. Please check your inbox.');
    } catch (error) {
      setError(error.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <img src={quwwaLogo} alt="Quwwa Health Logo" className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24" />
      </div>

      <p className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#191A15] mb-6 text-center">Nice to see you again</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <div className="flex items-start">
            <FaExclamationTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{error}</p>
              {error.includes('email not verified') && (
                <div className="mt-2">
                  <button
                    onClick={() => setShowResendVerification(!showResendVerification)}
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-red-600 hover:text-red-800 underline"
                  >
                    Resend verification email
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showResendVerification && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
          <div className="flex items-start">
            <FaEnvelope className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-2">
                Send verification email to <strong>{formData.email}</strong>?
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={handleResendVerificationEmail}
                  disabled={resendLoading}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {resendLoading ? 'Sending...' : 'Send Email'}
                </button>
                <button
                  onClick={() => setShowResendVerification(false)}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-[#848383] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#54BD95] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-[#848383] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-[#54BD95] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 px-4 flex items-center text-[#A6A6A6] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer text-[#848383]">
             <div className="relative">
                <input 
                  type="checkbox" 
                  id="remember-me" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${rememberMe ? 'bg-[#54BD95]' : 'bg-gray-200'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${rememberMe ? 'transform translate-x-4' : ''}`}></div>
            </div>
            Remember me
          </label>
          <Link to="/forgot-password" className="font-medium text-[#54BD95] hover:text-green-700">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={false}
          className="w-full bg-[#54BD95] text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
        >
          Sign In
        </button>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <div className="w-full">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            type="button"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#848383] mt-8">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchMode} className="font-medium text-[#54BD95] hover:text-green-700">
            Sign up now
          </button>
        </p>

        <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-400 mt-12">
            © Alpro 2025
        </p>
      </form>
    </div>
  );
};

export default LoginForm; 