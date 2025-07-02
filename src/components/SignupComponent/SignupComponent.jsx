import React from 'react';
import styles from './SignupComponent.module.css';
import Button from '../Button/Button.jsx';

const SignupComponent = ({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  gmail,
  setGmail,
  isLoading,
  error,
  handleSubmit,
  onSwitchToLogin
}) => {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Sign Up</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Username Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            User name
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className={styles.input}
            disabled={isLoading}
          />
        </div>

        {/* Gmail Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="gmail" className={styles.label}>
            Gmail
          </label>
          <input
            id="gmail"
            type="email"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            placeholder="Enter your Gmail address"
            className={styles.input}
            disabled={isLoading}
          />
        </div>

        {/* Password Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            New password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a new password"
            className={styles.input}
            disabled={isLoading}
          />
        </div>

        {/* Confirm Password Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className={styles.input}
            disabled={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          variant="primary"
          size="large"
          className={styles.submitButton}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </Button>

        {/* Toggle Mode Link */}
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