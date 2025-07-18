// src/components/RoomInput/RoomInput.jsx
import React from 'react';
import styles from './RoomInput.module.css';

const RoomInput = ({ roomCode, setRoomCode }) => {
  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    setRoomCode(value.replace(/[^A-Z0-9]/g, '')); // Only allow alphanumeric
  };

  return (
    <div className={styles.inputSection}>
      <label htmlFor="room-code" className={styles.label}>
        Enter Room Code
      </label>
      
      <div className={styles.inputContainer}>
        <input
          id="room-code"
          type="text"
          value={roomCode}
          onChange={handleChange}
          placeholder="Enter code here..."
          className={styles.input}
          maxLength={6} // Match your backend room code length
          aria-describedby="room-code-help"
        />
        <div id="room-code-help" className={styles.srOnly}>
          Enter the room code provided by the host to join the challenge
        </div>
      </div>
    </div>
  );
};

export default RoomInput;