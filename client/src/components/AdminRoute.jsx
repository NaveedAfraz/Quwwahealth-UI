import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
   console.log(isAuthenticated, user);
  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they login,
    // which is a nicer user experience than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (user?.role !== 'admin') {
    // if user is not an admin, redirect to home page
    return <Navigate to="/" />;
  }
  
  return children;
};

export default AdminRoute; 