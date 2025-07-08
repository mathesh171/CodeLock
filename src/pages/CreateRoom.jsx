// src/pages/CreateRoom.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Logo/Logo';
import CreateRoomForm from '../components/CreateRoomForm/CreateRoomForm';
import StarryBackground from '../components/StarryBackground/StarryBackground';
import styles from '../components/CreateRoom/CreateRoom.module.css';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [roomSettings, setRoomSettings] = useState({
    difficulty: 'Medium',
    questions: 3,
    timer: 30,
    customQuestions: '',
    customTimer: ''
  });
  const [showCustomQuestions, setShowCustomQuestions] = useState(false);
  const [showCustomTimer, setShowCustomTimer] = useState(false);

  const handleCreateRoom = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        alert('Please login first');
        navigate('/login');
        return;
      }

      // Prepare room data for backend
      const roomData = {
        difficulty: roomSettings.difficulty.toUpperCase(),
        num_questions: showCustomQuestions && roomSettings.customQuestions 
          ? parseInt(roomSettings.customQuestions) 
          : roomSettings.questions,
        timer: showCustomTimer && roomSettings.customTimer 
          ? parseInt(roomSettings.customTimer) 
          : roomSettings.timer === 'unlimited' ? 0 : roomSettings.timer,
        username: userData.username
      };

      const response = await axios.post('http://localhost:8084/api/room/create', roomData);
      
      if (response.data) {
        // Pass room data to Lobby page
        navigate(`/lobby/${response.data}`, {
          state: {
            roomData: {
              roomCode: response.data, // Room code from backend
              difficulty: roomData.difficulty,
              num_questions: roomData.num_questions,
              timer: roomData.timer === 0 ? 'Unlimited' : roomData.timer,
              players: [
                {
                  name: userData.username,
                  isHost: true
                }
              ]
            }
          }
        });
      } else {
        alert('Failed to create room');
      }
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Error creating room: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className={styles.container}>
      <StarryBackground />
      <div className={styles.logo}>
        <Logo />
      </div>
      <main className={styles.mainContent}>
        <CreateRoomForm
          roomSettings={roomSettings}
          setRoomSettings={setRoomSettings}
          showCustomQuestions={showCustomQuestions}
          showCustomTimer={showCustomTimer}
          onCreateRoom={handleCreateRoom}
          onCustomQuestions={() => setShowCustomQuestions(!showCustomQuestions)}
          onCustomTimer={() => setShowCustomTimer(!showCustomTimer)}
          onCustomQuestionsSubmit={() => setShowCustomQuestions(false)}
          onCustomTimerSubmit={() => setShowCustomTimer(false)}
        />
      </main>
      <div className={styles.gradientOverlay} aria-hidden="true"></div>
    </div>
  );
};

export default CreateRoom;