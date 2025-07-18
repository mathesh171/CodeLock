import React, { useState } from 'react';
import styles from './LoginComponent.module.css';
import Button from '../Button/Button';

const LoginComponent = ({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  isLoading,
  error,
  onSubmit,
  onDemoLogin,
  onSwitchToSignup
}) => {
  const [emailError, setEmailError] = useState('');

  const validateEmail = (emailValue) => {
    if (emailValue && !emailValue.includes('@')) {
      setEmailError('Please enter a valid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    onEmailChange(value);
    validateEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }
    
    onSubmit(e);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Login</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className={styles.input}
            disabled={isLoading}
          />
          {emailError && (
            <div className={styles.validationError}>
              {emailError}
            </div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Enter your password"
            className={styles.input}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || emailError}
          variant="primary"
          size="large"
          className={styles.submitButton}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        <div className={styles.toggleContainer}>
          <button
            type="button"
            onClick={onSwitchToSignup}
            disabled={isLoading}
            className={styles.toggleButton}
          >
            I don't have an account
          </button>
        </div>
      </form>

      <div className={styles.demoSection}>
        <Button
          onClick={onDemoLogin}
          disabled={isLoading}
          variant="secondary"
          size="large"
          className={styles.demoButton}
        >
          Continue as Demo User
        </Button>
        <p className={styles.demoText}>
          Skip login and try the app
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;