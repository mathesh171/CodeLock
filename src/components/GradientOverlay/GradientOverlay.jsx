// components/GradientOverlay/GradientOverlay.jsx
import React from 'react';
import styles from './GradientOverlay.module.css';

const GradientOverlay = () => {
  return (
    <div className={styles.gradientOverlay} aria-hidden="true"></div>
  );
};

export default GradientOverlay;