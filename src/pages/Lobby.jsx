import React from 'react';
import styles from './Lobby.module.css';
import { useLocation } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground/StarryBackground';
import Logo from '../components/Logo/Logo';

const Lobby = ({ onBackToLanding, onStartGame, isHost = true }) => {
  const location = useLocation();
  const roomData = location.state?.roomData || {};

  return (
    <div className={styles.container}>
      <StarryBackground/>
      <div className={styles.logo}>
        <Logo/>
      </div>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.grid}>
            {/* Instructions */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Instructions</h2>
              <ol className={styles.list} role="list">
                <li><span>1.</span> Both players solve the same set of DSA problems within a fixed time.</li>
                <li><span>2.</span> You can test your code during the match, but only the last submitted code is evaluated.</li>
                <li><span>3.</span> Score is calculated after you submit all questions or when the time runs out.</li>
                <li><span>4.</span> Test cases passed by your final submissions decide your score.</li>
                <li><span>5.</span> The player with more passed test cases wins. If scores are equal, faster submission wins.</li>
                <li><span>6.</span> No refreshing or external help allowed — fair play is mandatory.</li>
              </ol>

              {isHost ? (
                <div className={styles.buttonContainer}>
                  <button onClick={onStartGame} className={styles.startButton} aria-label="Start the game">
                    START
                  </button>
                </div>
              ) : (
                <div className={styles.waitingMessage}>
                  Waiting for host to start the game...
                </div>
              )}
            </section>

            {/* Room Details */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Room Details</h2>
              <dl className={styles.details}>
                <div><dt>Room Code</dt><dd>{roomData?.roomCode || "N/A"}</dd></div>
                <div><dt>Difficulty</dt><dd>{roomData?.difficulty || "N/A"}</dd></div>
                <div><dt>Questions</dt><dd>{roomData?.num_questions || "N/A"}</dd></div>
                <div><dt>Timer</dt><dd>{roomData?.timer || "N/A"} minutes</dd></div>
              </dl>


              <div className={styles.players}>
                <h3>Players</h3>
                <ul>
                  {roomData?.players?.length > 0 ? (
                    roomData.players.map((player, index) => (
                      <li key={index}>
                        <span>{index + 1}. {player.name}</span>
                        {player.isHost && <span className={styles.hostBadge}>HOST</span>}
                      </li>
                    ))
                  ) : (
                    <li>No players found</li>
                  )}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>

      <div className={styles.gradientOverlay} aria-hidden="true"></div>
    </div>
  );
};

export default Lobby;
