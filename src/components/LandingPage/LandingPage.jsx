import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import BackgroundEffects from '../BackgroundEffects/BackgroundEffects';
import { AuthUser } from '../../context/AuthUser';
import styles from './LandingPage.module.css';

const LandingPage = ({ onCreateChallenge, onJoinChallenge, onLogin }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDashboard = () => {
    setIsDropdownOpen(false);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  const dropdownStyles = {
    position: 'absolute',
    top: '100%',
    right: '0',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    minWidth: '150px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
    display: isDropdownOpen ? 'block' : 'none',
    marginTop: '8px'
  };

  const dropdownItemStyles = {
    padding: '12px 16px',
    color: '#e2e8f0',
    cursor: 'pointer',
    borderBottom: '1px solid #334155',
    transition: 'background-color 0.2s ease',
    fontSize: '14px',
    fontWeight: '500'
  };

  const dropdownItemHoverStyles = {
    backgroundColor: '#334155'
  };

  const usernameButtonStyles = {
    background: 'transparent',
    border: '2px solid #3b82f6',
    color: '#3b82f6',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const usernameContainerStyles = {
    position: 'relative',
    display: 'inline-block'
  };

  return (
    <div className={styles.container}>
      <BackgroundEffects />

      {/* Main content */}
      <main className={styles.main}>
        {/* Logo section */}
        <div className={styles.title}>
          <div className={styles.logoSection}>
            <Logo responsive={true} />
          </div>

          <div style={usernameContainerStyles} ref={dropdownRef}>
            {user ? (
              <>
                <button
                  onClick={toggleDropdown}
                  style={usernameButtonStyles}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#3b82f6';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#3b82f6';
                  }}
                >
                  {user.username}
                  <span style={{
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}>
                    ▼
                  </span>
                </button>
                
                <div style={dropdownStyles}>
                  <div
                    style={dropdownItemStyles}
                    onClick={handleDashboard}
                    onMouseEnter={(e) => {
                      Object.assign(e.target.style, dropdownItemHoverStyles);
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    Dashboard
                  </div>
                  <div
                    style={{
                      ...dropdownItemStyles,
                      borderBottom: 'none'
                    }}
                    onClick={handleLogout}
                    onMouseEnter={(e) => {
                      Object.assign(e.target.style, dropdownItemHoverStyles);
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    Logout
                  </div>
                </div>
              </>
            ) : (
              <Button
                onClick={onLogin}
                variant='ternary'
                size='medium'
                ariaLabel="Open Login Page"
              >
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Main title */}
        <div className={styles.titleSection}>
          <h2 className={styles.primaryTitle}>
            Battle-Test Your DSA Skills
          </h2>
          <h3 className={styles.secondaryTitle}>
            One-on-One
          </h3>
        </div>

        {/* Action buttons */}
        <div className={styles.buttonContainer}>
          <Button
            onClick={onCreateChallenge}
            variant="primary"
            size="large"
            ariaLabel="Create a new challenge room"
          >
            Create Challenge
          </Button>

          <Button
            onClick={onJoinChallenge}
            variant="secondary"
            size="large"
            ariaLabel="Join an existing challenge room"
          >
            Join Challenge
          </Button>
        </div>

        {/* Decorative elements */}
        {/* <div className={styles.decorativeCircle1}></div>
        <div className={styles.decorativeCircle2}></div>
        <div className={styles.decorativeDot1}></div>
        <div className={styles.decorativeDot2}></div> */}
      </main>

      <div className={styles.gradientOverlay}></div>
    </div>
  );
};

export default LandingPage;