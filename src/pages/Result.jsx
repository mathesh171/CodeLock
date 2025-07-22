import React, { useState, useEffect } from 'react';
import styles from './Result.module.css';
import Logo from '../components/Logo/Logo';
import BackgroundEffects from '../components/BackgroundEffects/BackgroundEffects';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { useParams } from 'react-router-dom';
import ResultTable from '../components/ResultTable/ResultTable';

const socketUrl = 'http://localhost:8084/ws';

const Result = () => {
  const [results, setResults] = useState([]);
  const { roomCode } = useParams();
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('authUser'));
    const username = userData && userData.username ? userData.username : '';
    setCurrentUser(username);

    const sock = new SockJS(socketUrl);
    const stompClient = over(sock);
    let connected = false;

    stompClient.connect({}, () => {
      connected = true;
      stompClient.subscribe('/topic/match-info', (msg) => {
        const data = JSON.parse(msg.body);
        setResults(data);
      });
      stompClient.send('/app/match/winning', {}, roomCode || 'DefaultRoomCode');
    });

    return () => {
      if (connected) stompClient.disconnect();
    };
  }, [roomCode]);

  let winnerName = '';
  if (results.length > 0) {
    const sorted = [...results].sort((a, b) => b.totalScore - a.totalScore);
    const winner = sorted[0];
    winnerName = winner?.user?.username || '';
  }

  return (
    <div className={styles.container}>
      <BackgroundEffects />
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
    
      </header>
      <main className={styles.mainContent}>
        <ResultTable
          results={results}
          currentUser={currentUser}
        />
      </main>
    </div>
  );
};

export default Result;
