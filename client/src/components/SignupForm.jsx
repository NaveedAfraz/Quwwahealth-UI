import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { FaTwitter, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { signup, googleLogin, clearError, clearEmailVerification } from '../store/slices/authSlice';

const SignupForm = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    schoolName: '',
    userId: '',
    district: '',
    state: '',
    country: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, emailVerificationSent } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Clear error when component mounts
    dispatch(clearError());
    dispatch(clearEmailVerification());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      return;
    }

    if (!acceptTerms) {
      return;
    }

    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    await dispatch(signup(signupData));
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    await dispatch(googleLogin(credentialResponse.credential));
  };

  const handleGoogleError = () => {
    console.error('Google signup failed');
  };

  // Show email verification success message
  if (emailVerificationSent) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <FaEnvelope className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-4 text-gray-900">Check Your Email</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#848383] mb-6">
            We've sent a verification email to <strong>{formData.email}</strong>
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <FaCheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
              <div className="text-left">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-blue-800 font-medium mb-2">Next Steps:</p>
                <ul className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-blue-700 space-y-1">
                  <li>• Check your email inbox (and spam folder)</li>
                  <li>• Click the verification link in the email</li>
                  <li>• Return here to log in once verified</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => {
                dispatch(clearEmailVerification());
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  schoolName: '',
                  userId: '',
                  district: '',
                  state: '',
                  country: '',
                });
                setAcceptTerms(false);
              }}
              className="w-full bg-[#54BD95] text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            >
              Sign Up Another Account
            </button>
            <button
              onClick={onSwitchMode}
              className="w-full bg-gray-200 text-[#191A15] font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            >
              Back to Login
            </button>
          </div>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-[#A6A6A6] mt-6">
            Didn't receive the email? Check your spam folder or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-6">Sign up</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg text-left">
            <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{typeof error === 'string' ? error : error.message || 'An error occurred'}</p>
            {error.errors && (
              <ul className="list-disc list-inside mt-2">
                {error.errors.map((err, index) => (
                  <li key={index} className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{err.msg}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4 mb-6">
          <div className="w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="filled_black"
              size="large"
              text="signup_with"
              shape="rectangular"
              width="100%"
            />
          </div>
    
        </div>

        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>
        
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-left mb-5">
          <div>
            <label className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#191A15] mb-1" htmlFor="name">
              Full Name
            </label>
            <input 
              type="text" 
              id="name" 
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 rounded-lg border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
              required
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#191A15] mb-1" htmlFor="email">
              Email
            </label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 rounded-lg border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-left mb-5">
          <div>
            <label className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#191A15] mb-1" htmlFor="schoolName">
              School Name
            </label>
            <input 
              type="text" 
              id="schoolName" 
              value={formData.schoolName}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 rounded-lg border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#191A15] mb-1" htmlFor="userId">
              User ID
            </label>
            <input 
              type="text" 
              id="userId" 
              value={formData.userId}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 rounded-lg border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 text-left mb-5">
          <div>
            <label className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#191A15] mb-1" htmlFor="district">
              District
            </label>
            <input 
              type="text" 
              id="district" 
              value={formData.district}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 rounded-lg border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#191A15] mb-1" htmlFor="state">
              State
            </label>
            <input 
              type="text" 
              id="state" 
              value={formData.state}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 rounded-lg border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#191A15] mb-1" htmlFor="country">
              Country
            </label>
            <input 
              type="text" 
              id="country" 
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 rounded-lg border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            />
          </div>
        </div>
        
        <div className="text-left mb-5">
          <label className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-[#191A15] mb-1" htmlFor="password">
            Password
          </label>
          <input 
            type="password" 
            id="password" 
            value={formData.password}
            onChange={handleInputChange}
            placeholder="6+ characters" 
            className="w-full p-3 bg-gray-100 rounded-lg border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            required
          />
        </div>

        <div className="flex items-start gap-3 mb-6 text-left text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#A6A6A6]">
          <input 
            type="checkbox" 
            id="terms" 
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-pink-500 focus:ring-pink-500" 
          />
          <label htmlFor="terms">
            Creating an account means you're okay with our <a href="#" className="underline text-purple-600">Terms of Service</a>, <a href="#" className="underline text-purple-600">Privacy Policy</a>, and our default <a href="#" className="underline text-purple-600">Notification Settings</a>.
          </label>
        </div>

        <div className="text-center">
            <button
                type="submit"
                disabled={loading || !acceptTerms}
                className="w-full md:w-auto bg-[#EC4899] text-white font-bold py-3 px-12 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            >
                {loading ? 'Creating Account...' : 'Create Account'}
            </button>
        </div>

        <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#848383] mt-8">
          Already a member?{' '}
          <button type="button" onClick={onSwitchMode} className="font-medium text-purple-600 hover:text-purple-800">
            Sign In
          </button>
        </p>

        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-400 mt-8 text-center">
          This site is protected by reCAPTCHA and the Google <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a> apply.
        </p>
      </form>
    </div>
  );
};

export default SignupForm; 