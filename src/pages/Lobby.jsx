import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Lobby = () => {
  const [players] = useState(['Player1', 'Player2', 'Player3']); // Mock data
  const navigate = useNavigate();
  const roomCode = "dddddd"
  const startGame = () => {
    navigate(`/coding/${roomCode}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🎮 Lobby Page</h1>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Room: Coding Challenge #123</h3>
        <p>Waiting for players to join...</p>
        <div style={{ marginTop: '15px' }}>
          <h4>Players ({players.length}/4):</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {players.map((player, index) => (
              <li key={index} style={{ padding: '5px 0', backgroundColor: '#e9ecef', margin: '5px 0', paddingLeft: '10px', borderRadius: '3px' }}>
                👤 {player}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ textAlign: 'center', gap: '10px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={startGame} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Start Game
        </button>
        <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Leave Room
        </Link>
      </div>
    </div>
  );
};

export default Lobby;