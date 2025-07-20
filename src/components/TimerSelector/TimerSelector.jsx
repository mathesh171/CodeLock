import React from 'react';
import CustomInput from '../CustomInput/CustomInput';
import styles from './TimerSelector.module.css';

const TimerSelector = ({ 
  roomSettings = {}, 
  setRoomSettings, 
  showCustomTimer, 
  onCustomTimer, 
  onCustomTimerSubmit 
}) => {
  const [customTimerError, setCustomTimerError] = React.useState('');
  const [isCustomTimerSet, setIsCustomTimerSet] = React.useState(false);
  const [customTimerValue, setCustomTimerValue] = React.useState('');
  const [shouldHideCustomTimer, setShouldHideCustomTimer] = React.useState(false);

  const handleCustomTimerSubmit = () => {
    const value = parseInt(roomSettings?.customTimer);
    if (!isNaN(value) && value >= 1 && value <= 1000) {
      setCustomTimerError('');
      setIsCustomTimerSet(true);
      setCustomTimerValue(value.toString());
      setRoomSettings(prev => ({ ...prev, timer: value }));
      onCustomTimerSubmit();
    } else {
      setCustomTimerError('Enter number between 1-1000');
    }
  };
  
  const handleCustomTimerButtonClick = () => {
    if (isCustomTimerSet) {
      setIsCustomTimerSet(false);
      setCustomTimerError('');
      onCustomTimer();
    } else {
      setShouldHideCustomTimer(false);
      onCustomTimer();
    }
  };

  const hideCustomTimer = () => {
    if (showCustomTimer && !isCustomTimerSet) {
      setCustomTimerError('');
      setShouldHideCustomTimer(true);
    }
  };

  const handleTimerSelect = (time) => {
    setRoomSettings(prev => ({ ...prev, timer: time }));
    setIsCustomTimerSet(false);
    setCustomTimerError('');
    hideCustomTimer();
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Timer (minutes)</legend>
      <div className={styles.topRow} role="radiogroup" aria-label="Select timer duration">
        {[15, 30, 60].map((time) => (
          <button
            key={time}
            onClick={() => handleTimerSelect(time)}
            className={`${styles.optionButton} ${
              roomSettings?.timer === time && !isCustomTimerSet ? styles.selected : ''
            }`}
            role="radio"
            aria-checked={roomSettings?.timer === time && !isCustomTimerSet}
            aria-label={`Select ${time} minutes timer`}
          >
            {time}
          </button>
        ))}
      </div>
      
      <div className={styles.bottomRow}>
        <button
          onClick={() => handleTimerSelect(90)}
          className={`${styles.optionButton} ${
            roomSettings?.timer === 90 && !isCustomTimerSet ? styles.selected : ''
          }`}
          role="radio"
          aria-checked={roomSettings?.timer === 90 && !isCustomTimerSet}
          aria-label="Select 90 minutes timer"
        >
          90
        </button>
        <button
          onClick={() => handleTimerSelect('unlimited')}
          className={`${styles.optionButton} ${
            roomSettings?.timer === 'unlimited' ? styles.selected : ''
          }`}
          role="radio"
          aria-checked={roomSettings?.timer === 'unlimited'}
          aria-label="Select unlimited timer"
        >
          Unlimited
        </button>
        <button
          onClick={handleCustomTimerButtonClick}
          onDoubleClick={() => {
            if (isCustomTimerSet) {
              setIsCustomTimerSet(false);
              setCustomTimerError('');
              onCustomTimer();
            }
          }}
          className={`${styles.optionButton} ${
            isCustomTimerSet ? styles.selected : ''
          }`}
          role="radio"
          aria-checked={isCustomTimerSet}
          aria-label={isCustomTimerSet ? `Custom ${customTimerValue} minutes - double click to edit` : "Enter custom timer duration"}
        >
          {isCustomTimerSet ? customTimerValue : 'other'}
        </button>
      </div>
      
      {showCustomTimer && !isCustomTimerSet && !shouldHideCustomTimer && (
        <CustomInput
          type="number"
          min="1"
          max="1000"
          value={roomSettings?.customTimer || ''}
          onChange={(e) => {
            setRoomSettings(prev => ({ ...prev, customTimer: e.target.value }));
            setCustomTimerError('');
          }}
          onSubmit={handleCustomTimerSubmit}
          placeholder="Enter minutes"
          error={customTimerError}
          ariaLabel="Enter custom timer duration in minutes"
        />
      )}
    </fieldset>
  );
};

export default TimerSelector;