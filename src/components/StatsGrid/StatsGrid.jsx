// components/StatsGrid/StatsGrid.jsx
import React from 'react';
import styles from './StatsGrid.module.css';

const StatsGrid = ({ stats }) => {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.gridHeader}>
        <h3 className={styles.gridTitle}>📊 Your Stats</h3>
      </div>
      
      <div className={styles.gridContent}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Games Played</span>
          <span className={styles.statValue}>{stats.gamesPlayed || 0}</span>
        </div>
        
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Wins</span>
          <span className={styles.statValue}>{stats.wins || 0}</span>
        </div>
        
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Avg Score</span>
          <span className={styles.statValue}>{stats.averageScore || 'N/A'}</span>
        </div>
        
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Best Time</span>
          <span className={styles.statValue}>{stats.bestTime || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;