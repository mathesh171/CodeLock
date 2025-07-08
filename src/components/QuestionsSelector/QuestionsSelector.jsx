import React from 'react';
import CustomInput from '../CustomInput/CustomInput';
import styles from './QuestionsSelector.module.css';

const QuestionsSelector = ({ 
  roomSettings = {}, 
  setRoomSettings, 
  showCustomQuestions, 
  onCustomQuestions, 
  onCustomQuestionsSubmit 
}) => {
  const [customQuestionsError, setCustomQuestionsError] = React.useState('');
  const [isCustomQuestionsSet, setIsCustomQuestionsSet] = React.useState(false);
  const [customQuestionsValue, setCustomQuestionsValue] = React.useState('');
  const [shouldHideCustomQuestions, setShouldHideCustomQuestions] = React.useState(false);

   const handleCustomQuestionsSubmit = () => {
    const value = parseInt(roomSettings?.customQuestions);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setCustomQuestionsError('');
      setIsCustomQuestionsSet(true);
      setCustomQuestionsValue(value.toString());
      setRoomSettings(prev => ({ ...prev, questions: value }));
      onCustomQuestionsSubmit();
    } else {
      setCustomQuestionsError('Enter number between 1-100');
    }
  };

  const handleCustomQuestionsButtonClick = () => {
    if (isCustomQuestionsSet) {
      setIsCustomQuestionsSet(false);
      setCustomQuestionsError('');
      onCustomQuestions();
    } else {
      setShouldHideCustomQuestions(false);
      onCustomQuestions();
    }
  };

  const hideCustomQuestions = () => {
    if (showCustomQuestions && !isCustomQuestionsSet) {
      setCustomQuestionsError('');
      setShouldHideCustomQuestions(true);
    }
  };

  const handleNumberSelect = (num) => {
    setRoomSettings(prev => ({ ...prev, questions: num }));
    setIsCustomQuestionsSet(false);
    setCustomQuestionsError('');
    hideCustomQuestions();
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Questions</legend>
      <div className={styles.topRow} role="radiogroup" aria-label="Select number of questions">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberSelect(num)}
            className={`${styles.optionButton} ${
              roomSettings?.questions === num && !isCustomQuestionsSet ? styles.selected : ''
            }`}
            role="radio"
            aria-checked={roomSettings?.questions === num && !isCustomQuestionsSet}
            aria-label={`Select ${num} question${num > 1 ? 's' : ''}`}
          >
            {num}
          </button>
        ))}
      </div>
      
      <div className={styles.bottomRow}>
        <button
          onClick={() => handleNumberSelect(4)}
          className={`${styles.optionButton} ${
            roomSettings?.questions === 4 && !isCustomQuestionsSet ? styles.selected : ''
          }`}
          role="radio"
          aria-checked={roomSettings?.questions === 4 && !isCustomQuestionsSet}
          aria-label="Select 4 questions"
        >
          4
        </button>
        <button
          onClick={handleCustomQuestionsButtonClick}
          onDoubleClick={() => {
            if (isCustomQuestionsSet) {
              setIsCustomQuestionsSet(false);
              setCustomQuestionsError('');
              onCustomQuestions();
            }
          }}
          className={`${styles.optionButton} ${
            isCustomQuestionsSet ? styles.selected : ''
          }`}
          role="radio"
          aria-checked={isCustomQuestionsSet}
          aria-label={isCustomQuestionsSet ? `Custom ${customQuestionsValue} questions - double click to edit` : "Enter custom number of questions"}
        >
          {isCustomQuestionsSet ? customQuestionsValue : 'other'}
        </button>
      </div>
      
      {showCustomQuestions && !isCustomQuestionsSet && !shouldHideCustomQuestions && (
        <CustomInput
          type="number"
          min="1"
          max="100"
          value={roomSettings?.customQuestions || ''}
          onChange={(e) => {
            setRoomSettings(prev => ({ ...prev, customQuestions: e.target.value }));
            setCustomQuestionsError('');
          }}
          onSubmit={handleCustomQuestionsSubmit}
          placeholder="Enter number"
          error={customQuestionsError}
          ariaLabel="Enter custom number of questions"
        />
      )}
    </fieldset>
  );
};

export default QuestionsSelector;