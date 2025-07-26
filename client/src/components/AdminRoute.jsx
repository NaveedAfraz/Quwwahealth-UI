import { useAuth } from '@/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { config } from '@/config/config';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading, setUser, setIsAuthenticated } = useAuth();
  const location = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check session with backend
        const response = await axios.get(
          `${config.API_BASE_URL}/auth/check`, 
          { withCredentials: true }
        );

        if (response.data.authenticated) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    // Only check auth if we're not already authenticated
    if (!isAuthenticated) {
      checkAuth();
    } else {
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, setUser, setIsAuthenticated]);

  // Show loading state while checking authentication
  if (loading || isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#54BD95]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // if (user?.role !== 'admin') {
  //   return <Navigate to="/" />;
  // }
  
  return children;
};

export default AdminRoute; 