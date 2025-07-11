import React from 'react';
import StatCard from '../StatCard/StatCard';
import styles from './StatsGrid.module.css';

const StatsGrid = ({ stats }) => {
  const statItems = [
    { 
      title: 'Games Played', 
      value: stats.gamesPlayed, 
      bgColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      icon: '🎮'
    },
    { 
      title: 'Wins', 
      value: stats.wins, 
      bgColor: 'rgba(34, 197, 94, 0.1)',
      borderColor: 'rgba(34, 197, 94, 0.3)',
      icon: '🏆'
    },
    { 
      title: 'Average Score', 
      value: `${stats.averageScore}%`, 
      bgColor: 'rgba(251, 146, 60, 0.1)',
      borderColor: 'rgba(251, 146, 60, 0.3)',
      icon: '📊'
    },
    { 
      title: 'Best Time', 
      value: stats.bestTime, 
      bgColor: 'rgba(236, 72, 153, 0.1)',
      borderColor: 'rgba(236, 72, 153, 0.3)',
      icon: '⏱️'
    }
  ];

  return (
    <div className={styles.statsGrid}>
      {statItems.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;