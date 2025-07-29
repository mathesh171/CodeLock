import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoom } from '../context/RoomContext';
import { joinRoom } from '../services/room';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      const userData = JSON.parse(localStorage.getItem('authUser'));
      if (!userData) {
        toast.error('Please login first', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
          transition: Bounce,
        });
        navigate('/login');
        return;
      }
      if (!inputCode.trim()) {
        toast.error('Please enter a room code.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
          transition: Bounce,
        });
        return;
      }
      const roomcode = inputCode.trim();

      const result = await joinRoom({ roomcode, username: userData.username });

      if (result === 'success') {
        setRoomCode(roomcode);
        setIsHost(false);
        navigate(`/lobby/${roomcode}`);
      } else {
        toast.error('Failed to join room: ' + result, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error('Error joining room: ' + (error.response?.data?.message || error.message), {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
        transition: Bounce,
      });
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <GradientOverlay />
    </div>
  );
};

export default JoinRoomPage;