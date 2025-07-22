// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { RoomProvider } from './context/RoomContext';
import './index.css';

const App = () => {
  return (
    <Router>
      <RoomProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </RoomProvider>
    </Router>
  );
};

export default App;