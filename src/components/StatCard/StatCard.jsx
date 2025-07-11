import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ title, value, bgColor, borderColor, icon }) => {
  return (
    <div 
      className={styles.statCard}
      style={{
        background: bgColor,
        borderColor: borderColor
      }}
    >
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;