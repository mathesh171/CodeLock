import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export function connectWebSocket(onRoomUpdate, onStart, roomCode) {
  const socket = new SockJS("http://localhost:8084/ws");
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    // Subscribe to room info (all rooms)
    stompClient.subscribe("/topic/room-info", message => {
      // This triggers onRoomUpdate in Lobby.jsx
      const roomInfo = JSON.parse(message.body);
      onRoomUpdate && onRoomUpdate(roomInfo);
    });
    // Listen for start signal for this room
    stompClient.subscribe(`/topic/start/${roomCode}`, message => {
      onStart && onStart(message.body);
    });
    // Request the latest room info after subscription, for all clients!
    stompClient.send("/app/room/info", {}, JSON.stringify({ roomCode }));
  });

  // Save for manual debug if needed
  window.stompClient = stompClient;
}

export function sendStartTest(roomCode) {
  if (stompClient) stompClient.send(`/app/start-test/${roomCode}`, {}, {});
}

export function disconnectWebSocket() {
  if (stompClient) {
    stompClient.disconnect();
    stompClient = null;
    window.stompClient = null;
  }
}
