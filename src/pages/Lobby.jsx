import React, { useEffect, useState } from 'react';
import styles from '../pageStyles/Lobby.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground/StarryBackground';
import Logo from '../components/Logo/Logo';
import { useRoom } from '../context/RoomContext';
import { startRoom } from '../services/room';
import { connectWebSocket, disconnectWebSocket, sendStartTest } from '../services/socket';

const Lobby = ({ onBackToLanding, onStartGame }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state?.roomData || {};
  const { isHost, roomCode } = useRoom();
  const [message, setMessage] = useState("");
  const [starting, setStarting] = useState(false);
  const [liveRoomData, setLiveRoomData] = useState(roomData);

  useEffect(() => {
    const code = roomCode || roomData.room_code || roomData.roomCode;

    connectWebSocket(
      (roomInfo) => {
        setLiveRoomData(roomInfo);
      },
      (startMsg) => {
        navigate(`/coding/${code}`);
      },
      code
    );


    return () => {
      disconnectWebSocket();
    };
  }, [roomCode, roomData.room_code, roomData.roomCode, navigate]);
  
  useEffect(() => {
    if (liveRoomData.status === "ONGOING") {
      const code = roomCode || liveRoomData.room_code || liveRoomData.roomCode;
      navigate(`/coding/${code}`);
    }
  }, [liveRoomData.status, roomCode, liveRoomData.room_code, liveRoomData.roomCode, navigate]);
  
  const handleStart = async () => {
    setMessage("");
    setStarting(true);
    try {
      const code = roomCode || liveRoomData?.room_code || liveRoomData?.roomCode;
      const result = await startRoom(code);
      if (result === "success") {
        sendStartTest(code);
        if (onStartGame) onStartGame();
      } else {
        setMessage(result);
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setStarting(false);
    }
  };
  const authUser = JSON.parse(localStorage.getItem('authUser'));


  const players = [
    liveRoomData.host_user_id && {
      name: liveRoomData.host_user_id.username,
      isHost: true,
      isMe: authUser && liveRoomData.host_user_id.id === authUser.id
    },
    liveRoomData.guest_user_id && {
      name: liveRoomData.guest_user_id.username,
      isHost: false,
      isMe: authUser && liveRoomData.guest_user_id.id === authUser.id
    }
  ].filter(Boolean);

 const isHostuser =!!authUser &&
  !!liveRoomData.host_user_id &&
  authUser.username === liveRoomData.host_user_id.username;
  return (
    <div className={styles.container}>
      <StarryBackground />
      <div className={styles.logo}>
        <Logo />
      </div>

    
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.grid}>
            
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

              {isHostuser && players.length > 1 ? (
                <div className={styles.buttonContainer}>
                  <button
                    onClick={handleStart}
                    className={styles.startButton}
                    aria-label="Start the game"
                    disabled={starting}
                  >
                    {starting ? "Starting..." : "START"}
                  </button>
                  {message && <div style={{ color: 'red', marginTop: '1rem' }}>{message}</div>}
                </div>
              ) : (
                <div className={styles.waitingMessage}>
                  {isHostuser ? "Waiting for players to join..." : "Waiting for host to start the game..."}
                </div>
              )}
            </section>

            
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Room Details</h2>
              <dl className={styles.details}>
                <div>
                  <dt>Room Code</dt>
                  <dd>{liveRoomData?.room_code || liveRoomData?.roomCode || "N/A"}</dd>
                </div>
                <div>
                  <dt>Difficulty</dt>
                  <dd>{liveRoomData?.difficulty || "N/A"}</dd>
                </div>
                <div>
                  <dt>Questions</dt>
                  <dd>{liveRoomData?.num_questions || "N/A"}</dd>
                </div>
                <div>
                  <dt>Timer</dt>
                  <dd>{liveRoomData?.timer || "N/A"} minutes</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{liveRoomData?.status || "N/A"}</dd>
                </div>
              </dl>

              <div className={styles.players}>
                <h3>Players</h3>
                <ul>
                  {players.length > 0 ? (
                    players.map((player, index) => (
                      <li key={index}>
                        <span>{index + 1}. {player.name}</span>
                        {player.isHost && (
                          <span className={styles.hostBadge}>HOST</span>
                        )}
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
