import React from 'react';
import styles from './BackgroundEffects.module.css';

const BackgroundEffects = () => {
  // Generate stars
  const stars = [...Array(100)].map((_, i) => (
    <div
      key={`star-${i}`}
      className={styles.star}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    />
  ));

  // Generate particles
  const particles = [...Array(20)].map((_, i) => (
    <div
      key={`particle-${i}`}
      className={styles.particle}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${2 + Math.random() * 3}s`,
      }}
    />
  ));

  return (
    <div className={styles.backgroundContainer}>
      {/* Starry background */}
      <div className={styles.starsContainer} aria-hidden="true">
        {stars}
      </div>

      {/* Animated background particles */}
      <div className={styles.particlesContainer} aria-hidden="true">
        {particles}
      </div>
    </div>
  );
};

export default BackgroundEffects;