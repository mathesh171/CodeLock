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

// Move userData and username above all code that uses them
let userData = null;
try {
  const stored = localStorage.getItem('authUser');
  userData = stored ? JSON.parse(stored) : null;
} catch (err) {
  console.error('Invalid JSON in localStorage:', err);
}
const username = userData?.username;

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if demo user
  const isDemoUser = localStorage.getItem('isDemoUser') === 'true';

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

  useEffect(() => {
    if (!username && !isDemoUser) {
      setError('You must be logged in to view the dashboard.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
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
          setRecentGames(generateDemoGames());
          setLoading(false);
          return;
        }

        // Fetch user profile
        const profileResponse = await axios.get(
          `http://localhost:8084/api/users/profile/username/${username}`
        );
        setProfile(profileResponse.data);

        // Fetch recent matches (you'll need to implement this endpoint)
        try {
          const matchesResponse = await axios.get(
            `http://localhost:8084/api/users/matches/${username}`
          );
          setRecentGames(matchesResponse.data);
        } catch (matchError) {
          console.error('Error fetching matches:', matchError);
          setRecentGames([]);
        }

      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, isDemoUser]);

  const generateDemoGames = () => {
    return [
      { date: '2024-01-15', opponent: 'Player123', result: 'Win', score: 95 },
      { date: '2024-01-14', opponent: 'CodeMaster', result: 'Loss', score: 78 },
      { date: '2024-01-13', opponent: 'DevGuru', result: 'Win', score: 89 },
    ];
  };

  const handlePasswordChange = async () => {
    if (passwordData.new !== passwordData.confirm) {
      setError('New passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8084/api/users/change-password',
        {
          username,
          currentPassword: passwordData.current,
          newPassword: passwordData.new
        }
      );
      
      if (response.data.success) {
        setError('');
        setIsEditing(false);
        setPasswordData({ current: '', new: '', confirm: '' });
      } else {
        setError(response.data.message || 'Password change failed');
      }
    } catch (err) {
      console.error('Error changing password:', err);
      setError(err.response?.data?.message || 'Error changing password');
    }
  };

  const updateProfileField = async (field, value) => {
    try {
      const response = await axios.put(
        `http://localhost:8084/api/users/update/${username}`,
        { [field]: value }
      );
      
      if (response.data.success) {
        setProfile(prev => ({ ...prev, [field]: value }));
        setError('');
        return true;
      } else {
        setError(response.data.message || 'Update failed');
        return false;
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Error updating profile');
      return false;
    }
  };

  // Generate stats based on available data
  const stats = {};
  if (profile?.totalmatch !== undefined) stats.gamesPlayed = profile.totalmatch;
  if (profile?.wins !== undefined) stats.wins = profile.wins;
  if (profile?.losses !== undefined) stats.losses = profile.losses;
  
  // Calculate win percentage if we have wins and total matches
  if (profile?.wins !== undefined && profile?.totalmatch !== undefined && profile.totalmatch > 0) {
    stats.winPercentage = Math.round((profile.wins / profile.totalmatch) * 100);
  }

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

  if (loading) {
    return (
      <div className={styles.container}>
        <BackgroundEffects />
        <DecorativeElements />
        <GradientOverlay />
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Loading dashboard...</p>
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
          <div className={styles.logoContainer}>
            <Logo />
          </div>
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
            onPasswordChange={(e) => {
              const { name, value } = e.target;
              setPasswordData(prev => ({
                ...prev,
                [name]: value
              }));
            }}
            onSubmitPassword={handlePasswordChange}
            onFieldUpdate={updateProfileField}
          />
          <StatsGrid stats={stats} />
          <RecentGamesTable games={recentGames} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;