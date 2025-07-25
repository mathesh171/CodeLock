import React from 'react';
import Button from '../Button/Button';
import styles from './JoinButton.module.css';

const JoinButton = ({ roomCode, onJoinRoom }) => {
  const isEnabled = roomCode.trim().length > 0;

  return (
    <Button
      onClick={onJoinRoom}
      disabled={!isEnabled}
      variant="primary"
      size="large"
      ariaLabel={isEnabled ? 'Join the room' : 'Enter a room code to join'}
      className={styles.wFull}
    >
      Join Room
    </Button>
  );
};

export default JoinButton;