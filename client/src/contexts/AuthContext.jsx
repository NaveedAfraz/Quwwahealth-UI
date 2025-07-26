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
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        // First check if we have a valid session
        const response = await axios.get(
          `${config.API_BASE_URL}/auth/check`,
          { withCredentials: true }
        );

        if (response.data.authenticated && isMounted) {
          console.log('Existing session found:', response.data.user);
          setUser(response.data.user);
          setIsAuthenticated(true);
          return;
        }

        // If no valid session, check Firebase auth state
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (!isMounted) return;
          
          console.log("Auth state changed:", firebaseUser);
          if (firebaseUser) {
            try {
              // Get fresh token and set up session with backend
              const idToken = await firebaseUser.getIdToken(true);
              const res = await axios.post(
                `${config.API_BASE_URL}/auth/session`,
                { idToken },
                { withCredentials: true }
              );
              
              if (isMounted) {
                console.log('Auth context session set up successfully', res.data);
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
              }
            } catch (error) {
              console.error('Auth context session error:', error);
              if (isMounted) {
                setUser(null);
                setIsAuthenticated(false);
              }
            }
          } else if (isMounted) {
            setUser(null);
            setIsAuthenticated(false);
          }
          
          if (isMounted) {
            setLoading(false);
          }
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error('Initial auth check failed:', error);
        if (isMounted) {
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
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
