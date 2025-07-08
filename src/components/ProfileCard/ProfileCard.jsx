import React from 'react';
import styles from './ProfileCard.module.css';

const ProfileCard = ({ profile, error, isEditing, passwordData, onEditToggle, onPasswordChange, onSubmitPassword }) => {
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
                <div className={styles.labelContainer}>
                  <span className={styles.label}>Username:</span>
                  <button className={styles.editButton} onClick={onEditToggle}>
                    [Edit]
                  </button>
                </div>
                <span className={styles.value}>{profile.username}</span>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.labelContainer}>
                  <span className={styles.label}>Email:</span>
                  <button className={styles.editButton} onClick={onEditToggle}>
                    [Edit]
                  </button>
                </div>
                <span className={styles.value}>{profile.email}</span>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.labelContainer}>
                  <span className={styles.label}>Password:</span>
                  <button className={styles.editButton} onClick={onEditToggle}>
                    [Edit]
                  </button>
                </div>
                {isEditing ? (
                  <div className={styles.passwordEditContainer}>
                    <input
                      type="password"
                      name="current"
                      value={passwordData.current}
                      onChange={onPasswordChange}
                      placeholder="Current Password"
                      className={styles.passwordInput}
                    />
                    <input
                      type="password"
                      name="new"
                      value={passwordData.new}
                      onChange={onPasswordChange}
                      placeholder="New Password"
                      className={styles.passwordInput}
                    />
                    <input
                      type="password"
                      name="confirm"
                      value={passwordData.confirm}
                      onChange={onPasswordChange}
                      placeholder="Confirm New Password"
                      className={styles.passwordInput}
                    />
                    <div className={styles.passwordButtons}>
                      <button 
                        className={styles.saveButton}
                        onClick={onSubmitPassword}
                      >
                        Save
                      </button>
                      <button 
                        className={styles.cancelButton}
                        onClick={onEditToggle}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className={styles.value}>••••••••</span>
                )}
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