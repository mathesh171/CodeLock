import React from 'react';
import styles from './StarryBackground.module.css';

const StarryBackground = () => {
  return (
    <div className={styles.container} aria-hidden="true">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className={styles.star}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarryBackground;