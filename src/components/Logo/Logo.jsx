import React from 'react';
import styles from './Logo.module.css';
import logo from '../../assets/logo.jpeg'


const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <img src={logo} alt="Logo" className={styles.logoImage}/>
      <h1 className={styles.logoText}>CODELOCK</h1>
    </div>
  );
};

export default Logo;