import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = {
    gamesPlayed: 15,
    wins: 8,
    averageScore: 87,
    bestTime: '2:34'
  };

  const recentGames = [
    { date: '2024-01-15', opponent: 'Player123', result: 'Win', score: 95 },
    { date: '2024-01-14', opponent: 'CodeMaster', result: 'Loss', score: 78 },
    { date: '2024-01-13', opponent: 'DevGuru', result: 'Win', score: 89 },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>📊 Dashboard Page</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
          <h3>Games Played</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{stats.gamesPlayed}</p>
        </div>
        <div style={{ backgroundColor: '#e8f5e8', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
          <h3>Wins</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{stats.wins}</p>
        </div>
        <div style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
          <h3>Average Score</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{stats.averageScore}%</p>
        </div>
        <div style={{ backgroundColor: '#fce4ec', padding: '20px', borderRadius: '5px', textAlign: 'center' }}>
          <h3>Best Time</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{stats.bestTime}</p>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Recent Games</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e9ecef' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Opponent</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Result</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {recentGames.map((game, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{game.date}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{game.opponent}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc', color: game.result === 'Win' ? 'green' : 'red', fontWeight: 'bold' }}>
                  {game.result}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{game.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;