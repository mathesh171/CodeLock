import React from 'react';
import styles from './Logo.module.css';
import logo from '../../assets/logo.jpeg'
import { useNavigate, useLocation } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCodingPage = location.pathname.startsWith('/coding/');
  const disablePointer = location.pathname === '/' || isCodingPage;
  
  const home = () => {
    if (! disablePointer) {
      navigate('/');
    }
  }

  
  return (
    <div 
      className={`${styles.logoContainer} ${disablePointer ? styles.noPointer : ''}`} 
      onClick={home}
    >
      <img src={logo} alt="Logo" className={styles.logoImage}/>
          <h1 className={`${styles.logoText} ${isCodingPage ? styles.codingColor : ''}`}>
          CODELOCK</h1>
    </div>
  );
};

export default Logo;