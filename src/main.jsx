import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthUserProvider } from './context/AuthUser';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthUserProvider>
      <App />
    </AuthUserProvider>
  </React.StrictMode>
);