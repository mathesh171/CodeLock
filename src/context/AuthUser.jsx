import React, { createContext, useState, useEffect } from 'react';

export const AuthUser = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user data on app load
  useEffect(() => {
    const checkExistingUser = () => {
      try {
        const userData = localStorage.getItem('userData');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          
          // Validate user data structure
          if (parsedUser && parsedUser.username && parsedUser.email) {
            setUser(parsedUser);
          } else {
            // Clear invalid data
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    checkExistingUser();
  }, []);

  const login = (userData) => {
    try {
      // Validate required fields
      if (!userData || !userData.username || !userData.email) {
        throw new Error('Invalid user data');
      }

      // Set user state
      setUser(userData);
      
      // Store in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      
      console.log('User logged in:', userData.username);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      // Clear user state
      setUser(null);
      
      // Remove from localStorage
      localStorage.removeItem('userData');
      
      // Clear any other auth-related data
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (updatedData) => {
    try {
      if (!user) {
        throw new Error('No user to update');
      }

      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      
      console.log('User data updated');
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthUser.Provider value={value}>
      {children}
    </AuthUser.Provider>
  );
};