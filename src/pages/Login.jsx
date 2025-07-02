import React, { useState } from 'react';
import Logo from '../components/Logo/Logo.jsx';
import looking from '../assets/looking.jpg';
import BackgroundEffects from '../components/BackgroundEffects/BackgroundEffects.jsx';
import LoginComponent from '../components/LoginComponent/LoginComponent.jsx';
import SignupComponent from '../components/SignupComponent/SignupComponent.jsx';
import LoginContainer from '../components/LoginContainer/LoginContainer.jsx';
import DecorativeElements from '../components/DecorativeElements/DecorativeElements.jsx';

const Login = ({ onLoginSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gmail, setGmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');
    
    // Basic validation
    if (!username.trim()) {
      setError(isLoginMode ? 'Please enter a username/email' : 'Please enter a username');
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    // Sign up specific validation
    if (!isLoginMode) {
      if (!gmail.trim()) {
        setError('Please enter your Gmail address');
        return;
      }
      
      if (!confirmPassword.trim()) {
        setError('Please confirm your password');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any non-empty credentials
      // Replace this with your actual authentication logic
      if (username.trim() && password.trim()) {
        const userData = {
          username: username.trim(),
          id: Date.now(), // Generate a simple ID
          loginTime: new Date().toISOString()
        };
        
        // Call the success callback
        onLoginSuccess(userData);
      } else {
        setError(isLoginMode ? 'Invalid credentials' : 'Sign up failed');
      }
    } catch (err) {
      setError(isLoginMode ? 'Login failed. Please try again.' : 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoUser = {
      username: 'DemoUser',
      id: 'demo-' + Date.now(),
      loginTime: new Date().toISOString()
    };
    onLoginSuccess(demoUser);
  };

  const switchToSignup = () => {
    setIsLoginMode(false);
    resetForm();
  };

  const switchToLogin = () => {
    setIsLoginMode(true);
    resetForm();
  };

  const resetForm = () => {
    setError('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setGmail('');
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      position: 'relative',
      background: 'linear-gradient(135deg, #030508 0%, #0a0f1a 25%, #0f1525 50%, #0a0f1a 75%, #050a10 100%)'
    }}>
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Left Side - Logo and Image */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo section */}
        <div style={{ marginBottom: '2rem' }}>
          <Logo />
        </div>
        
        {/* Image section */}
        <div style={{ 
          width: '100%', 
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <img 
            src= {looking}
            alt="Login illustration"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
      </div>

      {/* Right Side - Login Container */}
      <div style={{
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '0 2rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '500px'
        }}>
          <LoginContainer>
            {/* Login/Sign Up Form */}
            {isLoginMode ? (
              <LoginComponent
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                isLoading={isLoading}
                error={error}
                handleSubmit={handleSubmit}
                handleDemoLogin={handleDemoLogin}
                onSwitchToSignup={switchToSignup}
              />
            ) : (
              <SignupComponent
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                gmail={gmail}
                setGmail={setGmail}
                isLoading={isLoading}
                error={error}
                handleSubmit={handleSubmit}
                onSwitchToLogin={switchToLogin}
              />
            )}

            {/* Decorative elements */}
            {/* <DecorativeElements /> */}
          </LoginContainer>
        </div>
      </div>
    </div>
  );
};

export default Login;