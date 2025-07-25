import React from 'react';
import styles from './DifficultySelector.module.css';

const DifficultySelector = ({ roomSettings = {}, setRoomSettings }) => {
  const difficulties = ['BEGINNER', 'EASY', 'MEDIUM', 'HARD'];

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
              roomSettings?.difficulty?.toUpperCase() === difficulty ? styles.selected : ''
            }`}
            role="radio"
            aria-checked={roomSettings?.difficulty?.toUpperCase() === difficulty}
            aria-label={`Select ${difficulty.toLowerCase()} difficulty`}
          >
            {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
    </fieldset>
  );
};

export default DifficultySelector;