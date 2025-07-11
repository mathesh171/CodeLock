import React from 'react';
import styles from './ProfileCard.module.css';

const ProfileCard = ({ profile, error }) => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>👤 Profile Info</h2>
      </div>
      
      <div className={styles.cardContent}>
        {profile ? (
          <>
            <div className={styles.profileInfo}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Username:</span>
                <span className={styles.value}>{profile.username}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{profile.email}</span>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading profile...</p>
          </div>
        )}
        
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default ProfileCard;