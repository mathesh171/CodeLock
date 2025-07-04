import React from 'react';
import styles from './DifficultySelector.module.css';

const DifficultySelector = ({ roomSettings = {}, setRoomSettings }) => {
  const difficulties = ['Beginner', 'Easy', 'Medium', 'Hard'];

  const handleDifficultySelect = (difficulty) => {
    setRoomSettings(prev => ({ ...prev, difficulty }));
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Difficulty</legend>
      <div className={styles.gridContainer} role="radiogroup" aria-label="Select difficulty level">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => handleDifficultySelect(difficulty)}
            className={`${styles.optionButton} ${
              roomSettings?.difficulty === difficulty ? styles.selected : ''
            }`}
            role="radio"
            aria-checked={roomSettings?.difficulty === difficulty}
            aria-label={`Select ${difficulty} difficulty`}
          >
            {difficulty}
          </button>
        ))}
      </div>
    </fieldset>
  );
};

export default DifficultySelector;