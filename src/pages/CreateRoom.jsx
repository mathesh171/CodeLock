// src/pages/CreateRoom.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    // Add room creation logic here
    console.log('Creating room:', { roomName, maxPlayers });
    // For demo, navigate to lobby
     navigate(`/lobby/${roomName}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>🏗️ Create Room Page</h1>
      <form onSubmit={handleCreateRoom} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          required
        />
        <select
          value={maxPlayers}
          onChange={(e) => setMaxPlayers(Number(e.target.value))}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
        >
          <option value={2}>2 Players</option>
          <option value={4}>4 Players</option>
          <option value={6}>6 Players</option>
          <option value={8}>8 Players</option>
        </select>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Create Room
        </button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/" style={{ color: '#007bff' }}>← Back to Home</Link>
      </p>
    </div>
  );
};

export default CreateRoom;