// components/JoinButton/JoinButton.jsx
import React from 'react';
import Button from '../Button/Button';

const JoinButton = ({ roomCode, onJoinRoom }) => {
  const handleJoinRoom = () => {
    // Pass isHost: false to indicate this user joined via room code
    onJoinRoom(false);
  };

  // const isEnabled = roomCode.trim();
  const isEnabled = true;

  return (
    <Button
      onClick={handleJoinRoom}
      disabled={!isEnabled}
      variant="primary"
      size="large"
      ariaLabel={isEnabled ? 'Join the room' : 'Enter a room code to join'}
      className="w-full"
    >
      Join Room
    </Button>
  );
};

export default JoinButton;