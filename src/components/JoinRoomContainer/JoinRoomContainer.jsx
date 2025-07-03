// components/JoinRoomContainer/JoinRoomContainer.jsx
import React from 'react';
import styles from './JoinRoomContainer.module.css';
import JoinRoomForm from '../JoinRoomForm/JoinRoomForm';

const JoinRoomContainer = ({ roomCode, setRoomCode, onJoinRoom }) => {
  return (
    <main className={styles.main}>
      <JoinRoomForm 
        roomCode={roomCode} 
        setRoomCode={setRoomCode} 
        onJoinRoom={onJoinRoom} 
      />
    </main>
  );
};

export default JoinRoomContainer;