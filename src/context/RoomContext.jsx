
import React, { createContext, useContext, useState } from "react";

const RoomContext = createContext(undefined);

export const RoomProvider = ({ children }) => {
  const [roomCode, setRoomCode] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null);

  const handleRoomInfoUpdate = (info) => {
    setRoomInfo(info);
    setRoomCode(info.room_code);
    if (info.questions && Array.isArray(info.questions)) {
      setQuestions(info.questions);
    }
  };

  const contextValue = {
    roomCode,
    setRoomCode,
    questions,
    setQuestions,
    roomInfo,
    setRoomInfo,
    handleRoomInfoUpdate
  };

  return (
    <RoomContext.Provider value={contextValue}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const ctx = useContext(RoomContext);
  if (!ctx) {
    throw new Error('useRoom must be used within RoomProvider');
  }
  return ctx;
};

export default RoomContext;
