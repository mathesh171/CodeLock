import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CodingArea = () => {
  const [code, setCode] = useState('// Write your code here\nfunction solution() {\n  \n}');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const submitCode = () => {
    // Add code submission logic here''
    const roomCode="ddddd"
    console.log('Submitted code:', code);
     navigate(`/result/${roomCode}`);
  };

  return (
    <div style={{ padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>💻 Coding Area Page</h1>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: timeLeft < 60 ? 'red' : 'black' }}>
          ⏰ Time Left: {formatTime(timeLeft)}
        </div>
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Problem: Two Sum</h3>
        <p>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          flex: 1,
          fontFamily: 'monospace',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
          resize: 'none'
        }}
        placeholder="Write your solution here..."
      />

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={submitCode} style={{ padding: '10px 30px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          Submit Solution
        </button>
      </div>
    </div>
  );
};

export default CodingArea;