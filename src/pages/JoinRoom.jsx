// pages/JoinRoom.jsx
import React from 'react';
import BackgroundEffects from '../components/BackgroundEffects/BackgroundEffects';
import AppHeader from '../components/AppHeader/AppHeader';
import JoinRoomContainer from '../components/JoinRoomContainer/JoinRoomContainer';
import GradientOverlay from '../components/GradientOverlay/GradientOverlay';

const JoinRoomPage = ({ roomCode, setRoomCode, onBackToLanding, onJoinRoom }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', position: 'relative', overflow: 'hidden' }}>
      <BackgroundEffects />
      
      <AppHeader onBackToLanding={onBackToLanding} />

      <JoinRoomContainer 
        roomCode={roomCode} 
        setRoomCode={setRoomCode} 
        onJoinRoom={onJoinRoom} 
      />

      <GradientOverlay />
    </div>
  );
};

export default JoinRoomPage;