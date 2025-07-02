import React from 'react';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import BackgroundEffects from '../BackgroundEffects/BackgroundEffects';
import styles from './LandingPage.module.css';

const LandingPage = ({ onCreateChallenge, onJoinChallenge, onLogin}) => {
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

          <div>
            <Button
              onClick={onLogin}
              variant='ternary'
              size='medium'
              ariaLabel="Open Login Page"
            >Login</Button>
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