// src/pages/JoinRoom.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoom } from '../context/RoomContext';
import axios from 'axios';
import BackgroundEffects from '../components/BackgroundEffects/BackgroundEffects';
import AppHeader from '../components/AppHeader/AppHeader';
import JoinRoomContainer from '../components/JoinRoomContainer/JoinRoomContainer';
import GradientOverlay from '../components/GradientOverlay/GradientOverlay';

const JoinRoomPage = () => {
  const { setRoomCode, setIsHost } = useRoom();
  const [inputCode, setInputCode] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        alert('Please login first');
        navigate('/login');
        return;
      }

      const response = await axios.post('http://localhost:8084/api/room/join', {
        roomcode: inputCode,
        username: userData.username
      });

      if (response.data === 'success') {
        setRoomCode(inputCode);
        setIsHost(false);
        navigate(`/lobby/${inputCode}`);
      } else {
        alert('Failed to join room: ' + response.data);
      }
    } catch (error) {
      console.error('Error joining room:', error);
      alert('Error joining room: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', position: 'relative', overflow: 'hidden' }}>
      <BackgroundEffects />
      <AppHeader onBackToLanding={() => navigate('/')} />
      <JoinRoomContainer 
        roomCode={inputCode}
        setRoomCode={setInputCode}
        onJoinRoom={handleJoinRoom}
      />
      <GradientOverlay />
    </div>
  );
};

export default JoinRoomPage;