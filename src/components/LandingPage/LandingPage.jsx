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

  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
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
    navigate('/'); // Ensure user stays on home page after logout
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

          <div className={styles.userSection} ref={dropdownRef}>
            {user ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className={styles.usernameButton}
                  aria-label={`User menu for ${user.username}`}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className={styles.username}>{user.username}</span>
                  <span className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.dropdownArrowOpen : ''}`}>
                    ▼
                  </span>
                </button>
                
                {isDropdownOpen && (
                  <div className={styles.dropdown} role="menu" aria-labelledby="user-menu">
                    <button
                      className={styles.dropdownItem}
                      onClick={handleDashboard}
                      role="menuitem"
                      tabIndex={0}
                    >
                      Dashboard
                    </button>
                    <button
                      className={styles.dropdownItem}
                      onClick={handleLogout}
                      role="menuitem"
                      tabIndex={0}
                    >
                      Logout
                    </button>
                  </div>
                )}
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
      </main>

      <div className={styles.gradientOverlay}></div>
    </div>
  );
};

export default LandingPage;