import React from 'react';
import Logo from '../components/Logo/Logo';
import CreateRoomForm from '../components/CreateRoomForm/CreateRoomForm';
import StarryBackground from '../components/StarryBackground/StarryBackground';
import styles from '../components/CreateRoom/CreateRoom.module.css';

const CreateRoom = ({
  roomSettings,
  setRoomSettings,
  showCustomQuestions,
  showCustomTimer,
  onBackToLanding,
  onCreateRoom,
  onCustomQuestions,
  onCustomTimer,
  onCustomQuestionsSubmit,
  onCustomTimerSubmit
}) => {
  return (
    <div className={styles.container}>
      <StarryBackground />
      <div className={styles.logo}>
        <Logo/>
      </div>
      <main className={styles.mainContent}>
        <CreateRoomForm
          roomSettings={roomSettings}
          setRoomSettings={setRoomSettings}
          showCustomQuestions={showCustomQuestions}
          showCustomTimer={showCustomTimer}
          onCreateRoom={onCreateRoom}
          onCustomQuestions={onCustomQuestions}
          onCustomTimer={onCustomTimer}
          onCustomQuestionsSubmit={onCustomQuestionsSubmit}
          onCustomTimerSubmit={onCustomTimerSubmit}
        />
      </main>

      <div className={styles.gradientOverlay} aria-hidden="true"></div>
    </div>
  );
};

export default CreateRoom;