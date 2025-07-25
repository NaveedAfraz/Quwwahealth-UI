import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { config } from '../config/config';
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLinkingPassword, setLinkingPassword] = useState(false);

  // This effect handles keeping the user logged in on page refresh.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("Auth state changed:", firebaseUser);
      if (firebaseUser) {
        try {
          // Get fresh token and set up session with backend
          const idToken = await firebaseUser.getIdToken(true);
          const res = await axios.post(`${config.API_BASE_URL}/auth/session`,
            { idToken },
            { withCredentials: true }
          );
          console.log('Auth context session set up successfully', res.data);
          // Set user data after session is confirmed
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            address: res.data.address,
            city: res.data.city,
            contact_person: res.data.contact_person,
            created_at: res.data.created_at,
            firebase_uid: res.data.firebase_uid,
            id: res.data.id,
            password: res.data.password,
            phone_number: res.data.phone_number,
            school_name: res.data.school_name,
            state: res.data.state,
            updated_at: res.data.updated_at,
            zip_code: res.data.zip_code
          });
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth context session error:', error);
          // If session setup fails, ensure user is logged out
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        // If Firebase has no user, clear our app's state.
        const response = await axios.get(`${config.API_BASE_URL}/auth/check`,
          { withCredentials: true }
        );
        console.log('Auth check response:', response.data);
        if (response.data.authenticated) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post(`${config.API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log('Logout successful:', response.data);
      await auth.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = React.useMemo(() => ({
    loading,
    isAuthenticated,
    user,
    setUser,
    setIsAuthenticated,
    logout,
    isLinkingPassword,
    setLinkingPassword
  }), [loading, isAuthenticated, user, isLinkingPassword]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
