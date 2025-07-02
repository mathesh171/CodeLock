import React from 'react';
import styles from './LoginComponent.module.css';
import Button from '../Button/Button';

const LoginComponent = ({
  username,
  setUsername,
  password,
  setPassword,
  isLoading,
  error,
  handleSubmit,
  handleDemoLogin,
  onSwitchToSignup
}) => {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Login</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Username/Email Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            Username / Mail
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username or email"
            className={styles.input}
            disabled={isLoading}
          />
        </div>

        {/* Password Input */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
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
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        {/* Toggle Mode Link */}
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

      {/* Demo Login Button */}
      <div className={styles.demoSection}>
        <Button
          onClick={handleDemoLogin}
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