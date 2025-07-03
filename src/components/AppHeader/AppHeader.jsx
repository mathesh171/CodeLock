// components/AppHeader/AppHeader.jsx
import React from 'react';
import styles from './AppHeader.module.css';
import Logo from '../Logo/Logo';

const AppHeader = ({ onBackToLanding }) => {
  return (
    <header className={styles.header}>
      <button 
        onClick={onBackToLanding}
        className={styles.logoButton}
        aria-label="Go back to landing page"
      >
        <Logo />
      </button>
    </header>
  );
};

export default AppHeader;