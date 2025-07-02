import React from 'react';
import { useNavigate } from 'react-router-dom'
import LandingPage from '../components/LandingPage/LandingPage.jsx';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateChallenge = () => {
    navigate('/create-room');
  };

  const handleJoinChallenge = () => {
    navigate('/join-room');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <LandingPage 
        onLogin={handleLogin}
        onCreateChallenge={handleCreateChallenge}
        onJoinChallenge={handleJoinChallenge}
      />
    </div>
  );
};

export default Home;