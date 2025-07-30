import React, { useState, useEffect } from "react";
import styles from "./TopBar.module.css";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ username, roomCode, onSubmitTest }) => {
  const [timeLeft, setTimeLeft] = useState(0); 
  const [timerActive, setTimerActive] = useState(false);
  const [totalTimeMinutes, setTotalTimeMinutes] = useState(null);
  const navigate = useNavigate();

  const handleFinalSubmit = () => {
    fetch(`http://localhost:8084/api/submittest`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomCode,
        username,
      })
    }).then(() => {
      localStorage.removeItem(`timerFetched-${roomCode}`);
      localStorage.removeItem(`timeLeft-${roomCode}`);
      navigate(`/result/${roomCode}`);
    });
  };

  useEffect(() => {
    if (!roomCode) return;

    const hasFetched = localStorage.getItem(`timerFetched-${roomCode}`);
    const storedTime = localStorage.getItem(`timeLeft-${roomCode}`);

    if (hasFetched && storedTime !== null) {
      setTimeLeft(parseInt(storedTime));
      setTimerActive(true);
      setTotalTimeMinutes('restored');
      return;
    }

    axios.get(`http://localhost:8084/api/timer/${roomCode}`)
      .then((res) => {
        const data = res.data;
        if (data === 0) {
          setTotalTimeMinutes('unlimited');
          setTimeLeft(0);
        } else {
          setTotalTimeMinutes(data);
          setTimeLeft(data * 60);
        }
        setTimerActive(true);
        localStorage.setItem(`timerFetched-${roomCode}`, 'true');
      })
      .catch((e) => {
        console.error("Timer fetch error:", e);
      });
  }, [roomCode]);

  useEffect(() => {
    if (!timerActive) return;

    let interval;

    if (totalTimeMinutes === 'unlimited') {
      interval = setInterval(() => {
        setTimeLeft((t) => {
          const updated = t + 1;
          if (updated >= 12000) {
            clearInterval(interval);
            setTimerActive(false);
            handleFinalSubmit();
            return 12000;
          }
          localStorage.setItem(`timeLeft-${roomCode}`, updated);
          return updated;
        });
      }, 1000);
    } else {
      if (timeLeft <= 0) {
        setTimerActive(false);
        handleFinalSubmit();
        return;
      }

      interval = setInterval(() => {
        setTimeLeft((t) => {
          const updated = t - 1;
          if (updated <= 0) {
            clearInterval(interval);
            setTimerActive(false);
            handleFinalSubmit();
            return 0;
          }
          localStorage.setItem(`timeLeft-${roomCode}`, updated);
          return updated;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeLeft, timerActive, totalTimeMinutes, roomCode]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className={styles.topBar} role="banner">
      <div className={styles.left}>
        <Logo />
      </div>
      <div className={styles.right}>
        <div className={styles.info} aria-live="polite">
          <span className={styles.label}>{username}</span>
          <span className={styles.sep} aria-hidden="true">|</span>
          <span className={styles.label}>Room: <b>{roomCode}</b></span>
          <span className={styles.sep} aria-hidden="true">|</span>
          <span className={styles.label}>
            {totalTimeMinutes === 'unlimited' ? 'Time' : 'Time Left'}: 
          </span>
          <span className={styles.timer} aria-label={formatTime(timeLeft)}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <Button 
          onClick={onSubmitTest} 
          variant="primary" 
          size="medium" 
          className={styles.submitBtn}
          ariaLabel="Submit Test"
        >
          Submit Test
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
