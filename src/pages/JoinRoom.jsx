import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = (e) => {
    e.preventDefault();
    // Add room joining logic here
    console.log('Joining room with code:', roomCode);
    // For demo, navigate to lobby
    navigate(`/lobby/${roomCode}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>🚪 Join Room Page</h1>
      <form onSubmit={handleJoinRoom} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          required
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Join Room
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/" style={{ color: '#007bff' }}>← Back to Home</Link>
      </p>
    </div>
  );
};

export default JoinRoom;
