import React, { createContext, useState, useEffect } from 'react';

// Create the AuthUser context
const AuthUserContext = createContext();

// Export the context as AuthUser for component imports
export const AuthUser = AuthUserContext;

// AuthUser Provider component
export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user from localStorage on component mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('authUser');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  // Demo login function
  const demoLogin = () => {
    const demoUser = {
      id: 'demo_user',
      username: 'Demo User',
      email: 'demo@example.com',
      isDemo: true
    };
    login(demoUser);
  };

  // Update user function
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    try {
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  // Check if user is demo user
  const isDemoUser = () => {
    return user?.isDemo === true;
  };

  const contextValue = {
    user,
    isLoading,
    login,
    logout,
    demoLogin,
    updateUser,
    isAuthenticated,
    isDemoUser
  };

  return (
    <AuthUserContext.Provider value={contextValue}>
      {children}
    </AuthUserContext.Provider>
  );
};

// Custom hook to use the AuthUser context
export const useAuthUser = () => {
  const context = React.useContext(AuthUserContext);
  if (!context) {
    throw new Error('useAuthUser must be used within an AuthUserProvider');
  }
  return context;
};