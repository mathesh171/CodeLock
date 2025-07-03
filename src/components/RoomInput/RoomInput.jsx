// components/RoomInput/RoomInput.jsx
import React from 'react';
import styles from './RoomInput.module.css';

const RoomInput = ({ roomCode, setRoomCode }) => {
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
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          placeholder="Enter code here..."
          className={styles.input}
          maxLength={10}
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