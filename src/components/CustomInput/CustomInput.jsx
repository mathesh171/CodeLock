import React from 'react';
import styles from './CustomInput.module.css';

const CustomInput = ({
  type,
  min,
  max,
  value,
  onChange,
  onSubmit,
  placeholder,
  error,
  ariaLabel
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <input
          type={type}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={styles.input}
          aria-label={ariaLabel}
        />
        <button
          onClick={onSubmit}
          className={styles.setButton}
          aria-label="Set custom value"
        >
          Set
        </button>
      </div>
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomInput;