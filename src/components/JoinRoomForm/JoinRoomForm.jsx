import React from 'react';
import styles from './JoinRoomForm.module.css';
import RoomInput from '../RoomInput/RoomInput';
import JoinButton from '../JoinButton/JoinButton';

const JoinRoomForm = ({ roomCode, setRoomCode, onJoinRoom }) => {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Join Room</h2>
      <RoomInput roomCode={roomCode} setRoomCode={setRoomCode} onJoinRoom={onJoinRoom} />
      <div className={styles.buttonContainer}>
        <JoinButton roomCode={roomCode} onJoinRoom={onJoinRoom} />
      </div>
    </div>
  );
};

export default JoinRoomForm;