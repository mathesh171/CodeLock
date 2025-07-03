import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  // Retrieve and parse localStorage safely
  let userData = null;
  try {
    const stored = localStorage.getItem('userData');
    userData = stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error('Invalid JSON in localStorage:', err);
  }

  const username = userData?.username;

  useEffect(() => {
    if (!username) {
      setError('You must be logged in to view the dashboard.');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/api/users/profile/username/${username}`);
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      }
    };

    fetchProfile();
  }, [username]);

  const stats = {
    gamesPlayed: profile?.totalmatch ?? 0,
    wins: profile?.wins ?? 0,
    averageScore: 87,
    bestTime: '2:34'
  };

  const recentGames = [
    { date: '2024-01-15', opponent: 'Player123', result: 'Win', score: 95 },
    { date: '2024-01-14', opponent: 'CodeMaster', result: 'Loss', score: 78 },
    { date: '2024-01-13', opponent: 'DevGuru', result: 'Win', score: 89 },
  ];

  // Redirect or message if user is not logged in
  if (!username) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2 style={{ color: 'red' }}>⚠️ You must be logged in to view this page.</h2>
        <Link to="/login" style={{ textDecoration: 'underline', color: '#007bff' }}>Go to Login</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>📊 Dashboard Page</h1>

      {/* Profile Card */}
      <div style={{
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '400px',
        margin: '20px auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2 style={{ marginBottom: '15px', color: '#333' }}>👤 Profile Info</h2>
        {profile ? (
          <>
            <p style={{ fontSize: '16px', margin: '10px 0', color: '#555' }}>
              <strong>Username:</strong> {profile.username}
            </p>
            <p style={{ fontSize: '16px', margin: '10px 0', color: '#555' }}>
              <strong>Email:</strong> {profile.email}
            </p>
          </>
        ) : (
          <p style={{ color: 'gray' }}>Loading profile...</p>
        )}
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard title="Games Played" value={stats.gamesPlayed} bgColor="#e3f2fd" />
        <StatCard title="Wins" value={stats.wins} bgColor="#e8f5e8" />
        <StatCard title="Average Score" value={`${stats.averageScore}%`} bgColor="#fff3e0" />
        <StatCard title="Best Time" value={stats.bestTime} bgColor="#fce4ec" />
      </div>

      {/* Recent Games */}
      <RecentGamesTable games={recentGames} />

      {/* Back Button */}
      <div style={{ textAlign: 'center' }}>
        <Link to="/" style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

// Stats Card Component
const StatCard = ({ title, value, bgColor }) => (
  <div style={{ backgroundColor: bgColor, padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
    <h3>{title}</h3>
    <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{value}</p>
  </div>
);

// Recent Games Table
const RecentGamesTable = ({ games }) => (
  <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
    <h3>Recent Games</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
      <thead>
        <tr style={{ backgroundColor: '#e9ecef' }}>
          <th style={cellStyle}>Date</th>
          <th style={cellStyle}>Opponent</th>
          <th style={cellStyle}>Result</th>
          <th style={cellStyle}>Score</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game, index) => (
          <tr key={index}>
            <td style={cellStyle}>{game.date}</td>
            <td style={cellStyle}>{game.opponent}</td>
            <td style={{
              ...cellStyle,
              color: game.result === 'Win' ? 'green' : 'red',
              fontWeight: 'bold'
            }}>
              {game.result}
            </td>
            <td style={cellStyle}>{game.score}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Table Cell Styling
const cellStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  textAlign: 'left'
};

export default Dashboard;
