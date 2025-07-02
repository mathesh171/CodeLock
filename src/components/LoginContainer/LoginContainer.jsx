import React from 'react';
import styles from './LoginContainer.module.css';

const LoginContainer = ({ children }) => {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default LoginContainer;