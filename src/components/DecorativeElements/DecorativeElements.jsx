import React from 'react';
import styles from './DecorativeElements.module.css';

const DecorativeElements = () => {
  return (
    <>
      <div className={styles.circleTopLeft} aria-hidden="true"></div>
      <div className={styles.circleBottomRight} aria-hidden="true"></div>
      <div className={styles.dotLeft} aria-hidden="true"></div>
      <div className={styles.dotRight} aria-hidden="true"></div>
      <div className={styles.gradientOverlay} aria-hidden="true"></div>
    </>
  );
};

export default DecorativeElements;