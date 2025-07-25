import React, { useState } from 'react';
import styles from './ProfileCard.module.css';
import editIcon from '../../assets/edit.png';

const ProfileCard = ({ 
  profile, 
  error, 
  isEditing,
  passwordData, 
  onPasswordChange, 
  onSubmitPassword,
  onFieldUpdate
}) => {
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [localError, setLocalError] = useState('');

  const handleEditClick = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue);
    setLocalError('');
  };

  const handleSave = async (field) => {
    if (field === 'password') {
      onSubmitPassword();
      return;
    }

    if (!editValue.trim()) {
      setLocalError(`${field} cannot be empty`);
      return;
    }

    const success = await onFieldUpdate(field, editValue);
    if (success) {
      setEditingField(null);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setLocalError('');
  };

  const handleInputChange = (e) => {
    setEditValue(e.target.value);
    setLocalError('');
  };

  return (
    <div className={styles.profileCard}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>👤 Profile Info</h2>
      </div>
      
      <div className={styles.cardContent}>
        {profile ? (
          <>
            {error && <p className={styles.error}>{error}</p>}
            {localError && <p className={styles.error}>{localError}</p>}
            
            <div className={styles.profileInfo}>
              {/* Username Field */}
              <div className={styles.infoItem}>
                <div className={styles.labelContainer}>
                  <span className={styles.label}>Username:</span>
                  <button 
                    className={styles.editButton} 
                    onClick={() => handleEditClick('username', profile.username)}
                    disabled={isEditing}
                  >
                    <img src={editIcon} alt="Edit" className={styles.editIcon} />
                  </button>
                </div>
                {editingField === 'username' ? (
                  <div className={styles.editContainer}>
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleInputChange}
                      className={styles.editInput}
                    />
                    <div className={styles.editButtons}>
                      <button 
                        className={styles.saveButton}
                        onClick={() => handleSave('username')}
                      >
                        Save
                      </button>
                      <button 
                        className={styles.cancelButton}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className={styles.value}>{profile.username}</span>
                )}
              </div>

              
              <div className={styles.infoItem}>
                <div className={styles.labelContainer}>
                  <span className={styles.label}>Email:</span>
                  <button 
                    className={styles.editButton} 
                    onClick={() => handleEditClick('email', profile.email)}
                    disabled={isEditing}
                  >
                    <img src={editIcon} alt="Edit" className={styles.editIcon} />
                  </button>
                </div>
                {editingField === 'email' ? (
                  <div className={styles.editContainer}>
                    <input
                      type="email"
                      value={editValue}
                      onChange={handleInputChange}
                      className={styles.editInput}
                    />
                    <div className={styles.editButtons}>
                      <button 
                        className={styles.saveButton}
                        onClick={() => handleSave('email')}
                      >
                        Save
                      </button>
                      <button 
                        className={styles.cancelButton}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className={styles.value}>{profile.email}</span>
                )}
              </div>

              
              <div className={styles.infoItem}>
                <div className={styles.labelContainer}>
                  <span className={styles.label}>Password:</span>
                  <button 
                    className={styles.editButton} 
                    onClick={() => handleEditClick('password', '')}
                    disabled={isEditing}
                  >
                    <img src={editIcon} alt="Edit" className={styles.editIcon} />
                  </button>
                </div>
                {editingField === 'password' ? (
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
                        onClick={() => handleSave('password')}
                      >
                        Save
                      </button>
                      <button 
                        className={styles.cancelButton}
                        onClick={handleCancel}
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
      </div>
    </div>
  );
};

export default ProfileCard;