import React from 'react';
import { Link } from 'react-router-dom';

const Result = () => {
  const results = [
    { player: 'Player1', score: 95, time: '3:45', rank: 1 },
    { player: 'Player2', score: 88, time: '4:12', rank: 2 },
    { player: 'Player3', score: 76, time: '4:58', rank: 3 },
    { player: 'You', score: 82, time: '4:30', rank: 2 }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🏆 Result Page</h1>
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
        <h2>Competition Results</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e9ecef' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Rank</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Player</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Score</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} style={{ backgroundColor: result.player === 'You' ? '#fff3cd' : 'white' }}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                  {result.rank === 1 ? '🥇' : result.rank === 2 ? '🥈' : result.rank === 3 ? '🥉' : result.rank}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ccc', fontWeight: result.player === 'You' ? 'bold' : 'normal' }}>
                  {result.player}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{result.score}%</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{result.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: 'center', gap: '10px', display: 'flex', justifyContent: 'center' }}>
        <Link to="/dashboard" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          View Dashboard
        </Link>
        <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          New Game
        </Link>
      </div>
    </div>
  );
};

export default Result;