import React, { useState } from 'react';
import Logo from '../components/Logo/Logo.jsx';
import looking from '../assets/looking.jpg';
import BackgroundEffects from '../components/BackgroundEffects/BackgroundEffects.jsx';
import LoginComponent from '../components/LoginComponent/LoginComponent.jsx';
import SignupComponent from '../components/SignupComponent/SignupComponent.jsx';
import LoginContainer from '../components/LoginContainer/LoginContainer.jsx';
import DecorativeElements from '../components/DecorativeElements/DecorativeElements.jsx';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return email.includes('@');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email.trim() && password.trim()) {
        const userData = {
          username: email.split('@')[0],
          email: email.trim(),
          id: Date.now(),
          loginTime: new Date().toISOString()
        };
        
        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }
        
        navigate('/', { state: { username: userData.username } });
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!createPassword.trim()) {
      setError('Please create a password');
      return;
    }
    
    if (!confirmPassword.trim()) {
      setError('Please confirm your password');
      return;
    }
    
    if (createPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username.trim() && email.trim() && createPassword.trim()) {
        const userData = {
          username: username.trim(),
          email: email.trim(),
          id: Date.now(),
          loginTime: new Date().toISOString()
        };
        
        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }
        
        navigate('/', { state: { username: userData.username } });
      } else {
        setError('Sign up failed');
      }
    } catch (err) {
      setError('Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoUser = {
      username: 'DemoUser',
      email: 'demo@example.com',
      id: 'demo-' + Date.now(),
      loginTime: new Date().toISOString()
    };
    
    if (onLoginSuccess) {
      onLoginSuccess(demoUser);
    }
    
    navigate('/', { state: { username: demoUser.username } });
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
    setEmail('');
    setPassword('');
    setCreatePassword('');
    setConfirmPassword('');
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      position: 'relative',
      background: 'linear-gradient(135deg, #030508 0%, #0a0f1a 25%, #0f1525 50%, #0a0f1a 75%, #050a10 100%)'
    }}>
      <BackgroundEffects />

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
        <div style={{ marginBottom: '2rem' }}>
          <Logo />
        </div>
        
        <div style={{ 
          width: '100%', 
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <img 
            src={looking}
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
            {isLoginMode ? (
              <LoginComponent
                email={email}
                onEmailChange={setEmail}
                password={password}
                onPasswordChange={setPassword}
                isLoading={isLoading}
                error={error}
                onSubmit={handleLoginSubmit}
                onDemoLogin={handleDemoLogin}
                onSwitchToSignup={switchToSignup}
              />
            ) : (
              <SignupComponent
                username={username}
                onUsernameChange={setUsername}
                email={email}
                onEmailChange={setEmail}
                createPassword={createPassword}
                onCreatePasswordChange={setCreatePassword}
                confirmPassword={confirmPassword}
                onConfirmPasswordChange={setConfirmPassword}
                isLoading={isLoading}
                error={error}
                onSubmit={handleSignupSubmit}
                onSwitchToLogin={switchToLogin}
              />
            )}
          </LoginContainer>
        </div>
      </div>
    </div>
  );
};

export default Login;