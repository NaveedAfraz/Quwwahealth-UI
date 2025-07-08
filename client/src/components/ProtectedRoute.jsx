import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../store/slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // If we have a token but no user, try to get the profile
    if (token && !user) {
      dispatch(getProfile());
    }
    
    // If no token, redirect to auth page
    if (!token) {
      navigate('/auth');
    }
  }, [token, user, dispatch, navigate]);

  // Show loading while checking authentication
  if (token && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#54BD95]"></div>
      </div>
    );
  }

  // If not authenticated, don't render children
  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute; 