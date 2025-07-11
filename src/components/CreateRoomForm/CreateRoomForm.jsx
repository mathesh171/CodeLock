import React from 'react';
import DifficultySelector from '../DifficultySelector/DifficultySelector';
import QuestionsSelector from '../QuestionsSelector/QuestionsSelector';
import TimerSelector from '../TimerSelector/TimerSelector';
import styles from './CreateRoomForm.module.css';

const CreateRoomForm = ({
  roomSettings,
  setRoomSettings,
  showCustomQuestions,
  showCustomTimer,
  onCreateRoom,
  onCustomQuestions,
  onCustomTimer,
  onCustomQuestionsSubmit,
  onCustomTimerSubmit
}) => {
  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create Room</h2>
      
      <DifficultySelector
        roomSettings={roomSettings}
        setRoomSettings={setRoomSettings}
      />
      
      <QuestionsSelector
        roomSettings={roomSettings}
        setRoomSettings={setRoomSettings}
        showCustomQuestions={showCustomQuestions}
        onCustomQuestions={onCustomQuestions}
        onCustomQuestionsSubmit={onCustomQuestionsSubmit}
      />
      
      <TimerSelector
        roomSettings={roomSettings}
        setRoomSettings={setRoomSettings}
        showCustomTimer={showCustomTimer}
        onCustomTimer={onCustomTimer}
        onCustomTimerSubmit={onCustomTimerSubmit}
      />

      <button
        onClick={onCreateRoom}
        className={styles.createButton}
        aria-label="Create room with selected settings"
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoomForm;