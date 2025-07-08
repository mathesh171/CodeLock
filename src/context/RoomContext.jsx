// src/context/RoomContext.jsx
import React, { createContext, useState, useContext } from 'react';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [roomCode, setRoomCode] = useState('');
  const [isHost, setIsHost] = useState(false);

  return (
    <RoomContext.Provider value={{ roomCode, setRoomCode, isHost, setIsHost }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);