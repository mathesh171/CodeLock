// src/components/TopBar/TopBar.jsx
import React from "react";
import styles from "./TopBar.module.css";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";

const TopBar = ({ username, roomCode, timeLeft, onSubmitTest }) => {
  // Format timeLeft as MM:SS
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');

  return (
    <header className={styles.topBar}>
      <div className={styles.left}>
        <Logo />
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <span className={styles.label}>{username}</span>
          <span className={styles.sep}>/</span>
          <span className={styles.label}>Room: <b>{roomCode}</b></span>
          <span className={styles.sep}>|</span>
          <span className={styles.timer}>
            <svg width="18" height="18" fill="none">
              <circle cx="9" cy="9" r="8" stroke="#2563eb" strokeWidth="2"/>
              <path d="M9 5v4l2 2" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {mins}:{secs}
          </span>
        </div>
        <Button onClick={onSubmitTest} variant="primary" size="medium" className={styles.submitBtn}>Submit Test</Button>
      </div>
    </header>
  );
};

export default TopBar;
