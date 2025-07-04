import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BackgroundEffects from '../BackgroundEffects/BackgroundEffects';
import DecorativeElements from '../DecorativeElements/DecorativeElements';
import GradientOverlay from '../GradientOverlay/GradientOverlay';
import ProfileCard from '../ProfileCard/ProfileCard';
import StatsGrid from '../StatsGrid/StatsGrid';
import RecentGamesTable from '../RecentGamesTable/RecentGamesTable';
import styles from './Dashboard.module.css';

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
        <header className={styles.header}>
          <h1 className={styles.title}>📊 Dashboard Page</h1>
        </header>

        <div className={styles.dashboardGrid}>
          <ProfileCard profile={profile} error={error} />
          <StatsGrid stats={stats} />
          <RecentGamesTable games={recentGames} />
        </div>

        <div className={styles.backButtonContainer}>
          <Link to="/" className={styles.backButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




/*
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BackgroundEffects from '../BackgroundEffects/BackgroundEffects';
import DecorativeElements from '../DecorativeElements/DecorativeElements';
import GradientOverlay from '../GradientOverlay/GradientOverlay';
import ProfileCard from '../ProfileCard/ProfileCard';
import StatsGrid from '../StatsGrid/StatsGrid';
import RecentGamesTable from '../RecentGamesTable/RecentGamesTable';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  // ============================================
  // 🚨 DEVELOPER TEST DATA - REMOVE AFTER TESTING
  // ============================================
  const DEVELOPER_MODE = true; // Set to false to disable test data
  const MOCK_USER_DATA = {
    username: 'testuser123',
    email: 'test@example.com',
    id: 1
  };
  const MOCK_PROFILE_DATA = {
    id: 1,
    username: 'testuser123',
    email: 'test@example.com',
    totalmatch: 25,
    wins: 18,
    losses: 7,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  };
  // ============================================
  // END DEVELOPER TEST DATA
  // ============================================

  // Retrieve and parse localStorage safely
  let userData = null;
  try {
    const stored = localStorage.getItem('userData');
    userData = stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error('Invalid JSON in localStorage:', err);
  }

  // 🚨 DEVELOPER OVERRIDE - REMOVE AFTER TESTING
  if (DEVELOPER_MODE && !userData) {
    userData = MOCK_USER_DATA;
    console.log('🚨 DEVELOPER MODE: Using mock user data');
  }

  const username = userData?.username;

  useEffect(() => {
    if (!username) {
      setError('You must be logged in to view the dashboard.');
      return;
    }

    const fetchProfile = async () => {
      try {
        // 🚨 DEVELOPER OVERRIDE - REMOVE AFTER TESTING
        if (DEVELOPER_MODE) {
          console.log('🚨 DEVELOPER MODE: Using mock profile data');
          setProfile(MOCK_PROFILE_DATA);
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
        <header className={styles.header}>
          <h1 className={styles.title}>📊 Dashboard Page</h1>
          {/* 🚨 DEVELOPER MODE INDICATOR - REMOVE AFTER TESTING *./}
          {DEVELOPER_MODE && (
            <div style={{
              background: 'rgba(255, 193, 7, 0.2)',
              border: '1px solid #ffc107',
              borderRadius: '4px',
              padding: '8px',
              margin: '10px 0',
              color: '#856404',
              fontSize: '14px'
            }}>
              🚨 DEVELOPER MODE: Using mock data
            </div>
          )}
        </header>

        <div className={styles.dashboardGrid}>
          <ProfileCard profile={profile} error={error} />
          <StatsGrid stats={stats} />
          <RecentGamesTable games={recentGames} />
        </div>

        <div className={styles.backButtonContainer}>
          <Link to="/" className={styles.backButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
*/