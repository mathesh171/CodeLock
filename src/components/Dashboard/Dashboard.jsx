import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BackgroundEffects from '../BackgroundEffects/BackgroundEffects';
import DecorativeElements from '../DecorativeElements/DecorativeElements';
import GradientOverlay from '../GradientOverlay/GradientOverlay';
import ProfileCard from '../ProfileCard/ProfileCard';
import StatsGrid from '../StatsGrid/StatsGrid';
import RecentGamesTable from '../RecentGamesTable/RecentGamesTable';
import Logo from '../Logo/Logo';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Check if demo user
  const isDemoUser = localStorage.getItem('isDemoUser') === 'true';

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
    if (!username && !isDemoUser) {
      setError('You must be logged in to view the dashboard.');
      return;
    }

    const fetchProfile = async () => {
      try {
        if (isDemoUser) {
          // Generate demo data
          const demoProfile = {
            username: 'demo_user',
            email: 'demo@example.com',
            totalmatch: Math.floor(Math.random() * 50) + 10,
            wins: Math.floor(Math.random() * 30) + 5,
            losses: Math.floor(Math.random() * 20) + 1
          };
          setProfile(demoProfile);
          return;
        }

        const response = await axios.get(`http://localhost:8084/api/users/profile/username/${username}`);
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      }
    };

    fetchProfile();
  }, [username, isDemoUser]);

  // Generate stats based on available data
  const stats = {};
  if (profile?.totalmatch !== undefined) stats.gamesPlayed = profile.totalmatch;
  if (profile?.wins !== undefined) stats.wins = profile.wins;
  
  // Only include averageScore and bestTime if they exist in profile
  if (profile?.averageScore !== undefined) stats.averageScore = profile.averageScore;
  if (profile?.bestTime !== undefined) stats.bestTime = profile.bestTime;
  
  // For demo user, generate random stats
  if (isDemoUser) {
    stats.averageScore = Math.floor(Math.random() * 30) + 70;
    stats.bestTime = `${Math.floor(Math.random() * 5)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
  }

  const recentGames = [
    { date: '2024-01-15', opponent: 'Player123', result: 'Win', score: 95 },
    { date: '2024-01-14', opponent: 'CodeMaster', result: 'Loss', score: 78 },
    { date: '2024-01-13', opponent: 'DevGuru', result: 'Win', score: 89 },
  ];

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitPasswordChange = () => {
    // Here you would typically make an API call to update the password
    console.log('Password change submitted', passwordData);
    setIsEditing(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  // Redirect or message if user is not logged in and not demo user
  if (!username && !isDemoUser) {
    return (
      <div className={styles.container}>
        <BackgroundEffects />
        <DecorativeElements />
        <GradientOverlay />
        <div className={styles.loginRequired}>
          <h2>⚠️ You must be logged in to view this page.</h2>
          <Link to="/login" className={styles.loginLink}>Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BackgroundEffects />
      <DecorativeElements />
      <GradientOverlay />
      
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          {isDemoUser && (
            <div className={styles.demoBadge}>
              Demo Mode - Using sample data
            </div>
          )}
        </header>

        <div className={styles.dashboardGrid}>
          <ProfileCard 
            profile={profile} 
            error={error} 
            isEditing={isEditing}
            passwordData={passwordData}
            onEditToggle={() => setIsEditing(!isEditing)}
            onPasswordChange={handlePasswordChange}
            onSubmitPassword={submitPasswordChange}
          />
          <StatsGrid stats={stats} />
          <RecentGamesTable games={recentGames} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;