import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthNavigator = () => {
  const { isAuthenticated, isLinkingPassword } = useAuth();
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Only navigate to home if the user is authenticated AND not in the middle of linking a password.
    if (isAuthenticated && !isLinkingPassword && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate('/');
    }
    // Reset if the user logs out, allowing for navigation on next login.
    if (!isAuthenticated) {
      hasNavigated.current = false;
    }
  }, [isAuthenticated, isLinkingPassword, navigate]);

  return null; // This component renders nothing
};

export default AuthNavigator;
