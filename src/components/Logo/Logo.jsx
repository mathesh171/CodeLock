import React from 'react';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.iconContainer}>
        <div className={styles.iconInner}>
          <span className={styles.iconText}>C</span>
        </div>
      </div>
      <h1 className={styles.logoText}>CODELOCK</h1>
    </div>
  );
};

export default Logo;