import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo/Logo';
import CreateRoomForm from '../components/CreateRoomForm/CreateRoomForm';
import StarryBackground from '../components/StarryBackground/StarryBackground';
import styles from '../components/CreateRoom/CreateRoom.module.css';
import { createRoom } from '../services/room';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [roomSettings, setRoomSettings] = useState({});
  const [showCustomQuestions, setShowCustomQuestions] = useState(false);
  const [showCustomTimer, setShowCustomTimer] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateRoom = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('authUser'));
      if (!userData) {
        alert('Please login first');
        navigate('/login');
        return;
      }

      
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

      setMessage("");
      const result = await createRoom(roomData);
      if (/^[a-zA-Z0-9]{6,}$/.test(result)) {
        navigate(`/lobby/${result}`, {
          state: {
            roomData: {
              roomCode: result,
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
        setMessage(result);
      }
    } catch (error) {
      setMessage(error.message);
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
        {message && <div style={{color: 'red', marginTop: '1rem'}}>{message}</div>}
      </main>
      <div className={styles.gradientOverlay} aria-hidden="true"></div>
    </div>
  );
};

export default CreateRoom;