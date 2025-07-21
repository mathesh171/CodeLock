import React, { useState } from 'react';
import styles from './SignupComponent.module.css';
import Button from '../Button/Button.jsx';

const SignupComponent = ({
  username,
  onUsernameChange,
  email,
  onEmailChange,
  createPassword,
  onCreatePasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  isLoading,
  error,
  onSubmit,
  onSwitchToLogin
}) => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (emailValue) => {
    if (emailValue && !emailValue.includes('@')) {
      setEmailError('Please enter a valid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePasswordMatch = (createPwd, confirmPwd) => {
    if (createPwd && confirmPwd && createPwd !== confirmPwd) {
      setPasswordError('Passwords do not match');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    onEmailChange(value);
    validateEmail(value);
  };

  const handleCreatePasswordChange = (e) => {
    const value = e.target.value;
    onCreatePasswordChange(value);
    validatePasswordMatch(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    onConfirmPasswordChange(value);
    validatePasswordMatch(createPassword, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailValid = validateEmail(email);
    const passwordValid = validatePasswordMatch(createPassword, confirmPassword);
    
    if (!emailValid || !passwordValid) {
      return;
    }
    
    onSubmit(e);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Sign Up</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="Enter your username"
            className={styles.input}
            disabled={isLoading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email address"
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
          <label htmlFor="createPassword" className={styles.label}>
            Create Password
          </label>
          <input
            id="createPassword"
            type="password"
            value={createPassword}
            onChange={handleCreatePasswordChange}
            placeholder="Create a new password"
            className={styles.input}
            disabled={isLoading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your password"
            className={styles.input}
            disabled={isLoading}
          />
          {passwordError && (
            <div className={styles.validationError}>
              {passwordError}
            </div>
          )}
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading || emailError || passwordError}
          variant="primary"
          size="large"
          className={styles.submitButton}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>

        <div className={styles.toggleContainer}>
          <button
            type="button"
            onClick={onSwitchToLogin}
            disabled={isLoading}
            className={styles.toggleButton}
          >
            I already have an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupComponent;