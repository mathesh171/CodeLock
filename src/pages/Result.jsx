import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { Link, useParams } from 'react-router-dom';

const socketUrl = 'http://localhost:8084/ws'; // Adjust this to your backend ws endpoint

const Result = () => {
  const [results, setResults] = useState([]);
  const { roomCode } = useParams(); // If you're using React Router to route like /result/:roomCode
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    // Get current username from localStorage
    const username = JSON.parse(localStorage.getItem('authUser')).username || '';
    setCurrentUser(username);

    const sock = new SockJS(socketUrl);
    const stompClient = over(sock);

    stompClient.connect({}, () => {
      // Subscribe for results
      stompClient.subscribe('/topic/match-info', (msg) => {
        const data = JSON.parse(msg.body);
        setResults(data);
      });

      // Send room code to get results
      // Only send after connection!
      stompClient.send('/app/match/winning', {}, roomCode || 'DefaultRoomCode');
    });

    return () => {
      stompClient.disconnect();
    };
  }, [roomCode]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🏆 Result Page</h1>
      {/* Winner/Loser Message */}
      {results.length > 0 && (
        (() => {
          const sorted = [...results].sort((a, b) => b.totalScore - a.totalScore);
          const winner = sorted[0];
          const winnerName = winner?.user?.username || '';
          if (currentUser === winnerName) {
            return (
              <div style={{ marginBottom: '15px', fontSize: '1.2em', color: '#28a745', fontWeight: 'bold' }}>
                Winner: {winnerName}
              </div>
            );
          } else {
            return (
              <div style={{ marginBottom: '15px', fontSize: '1.2em', color: '#dc3545', fontWeight: 'bold' }}>
                Loser: {currentUser} | Winner: {winnerName}
              </div>
            );
          }
        })()
      )}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
        <h2>Competition Results</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#e9ecef' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Rank</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Player</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Score</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Winner</th>
            </tr>
          </thead>
          <tbody>
            {results
              .sort((a, b) => b.totalScore - a.totalScore)
              .map((result, idx) => (
                <tr key={result.user.id} style={{ background: result.winner ? '#d4edda' : 'white' }}>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ccc', fontWeight: result.user.username === 'You' ? 'bold' : 'normal' }}>
                    {result.user.username}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{result.totalScore}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    {result.winner ? '🏆 Winner' : '—'}
                  </td>
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
