import React from 'react';
import LandingPage from '../components/LandingPage/LandingPage.jsx';

const Home = () => {
  const handleCreateChallenge = () => {
    console.log('Create Challenge clicked');
    // Add your create challenge logic here
  };

  const handleJoinChallenge = () => {
    console.log('Join Challenge clicked');
    // Add your join challenge logic here
  };

  return (
    <div>
      <LandingPage 
        onCreateChallenge={handleCreateChallenge}
        onJoinChallenge={handleJoinChallenge}
      />
    </div>
  );
};

export default Home;