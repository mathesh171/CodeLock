import React from 'react';
import styles from './Logo.module.css';
import logo from '../../assets/logo.jpeg'
import { useNavigate, useLocation } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const home = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  }
  
  return (
    <div 
      className={`${styles.logoContainer} ${location.pathname === '/' ? styles.noPointer : ''}`} 
      onClick={home}
    >
      <img src={logo} alt="Logo" className={styles.logoImage}/>
      <h1 className={styles.logoText}>CODELOCK</h1>
    </div>
  );
};

export default Logo;