import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import CreateRoom from '../pages/CreateRoom';
import JoinRoom from '../pages/JoinRoom';
import LobbyPage from '../pages/Lobby';
import CodingArea from '../pages/CodingArea';
import Result from '../pages/Result';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-room" element={<CreateRoom />} />
      <Route path="/join-room" element={<JoinRoom />} />
      <Route path="/lobby/:roomCode" element={<LobbyPage />} />
      <Route path="/coding/:roomCode" element={<CodingArea />} />
      <Route path="/result/:roomCode" element={<Result />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<div style={{padding: '20px', textAlign: 'center'}}>
        <h2>404 - Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
      </div>} />
    </Routes>
  );
};

export default AppRoutes;