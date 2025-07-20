export async function createRoom({ username, difficulty, timer, num_questions }) {
  try {
    const response = await fetch("http://localhost:8084/api/room/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, difficulty, timer, num_questions }),
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(text || "Room creation failed");
    }
    return text; // room code or error message
  } catch (error) {
    throw error;
  }
}

export async function joinRoom({ roomcode, username }) {
  try {
    const response = await fetch("http://localhost:8084/api/room/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomcode, username }),
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(text || "Join room failed");
    }
    return text; // "success" or error message
  } catch (error) {
    throw error;
  }
}

export async function startRoom(roomCode) {
  try {
    const response = await fetch(`http://localhost:8084/api/room/start/${roomCode}`, {
      method: "POST",
    });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(text || "Start room failed");
    }
    return text; // "success" or error message
  } catch (error) {
    throw error;
  }
}

export async function fetchAllLobbies() {
  try {
    const response = await fetch("http://localhost:8084/api/room/all");
    if (!response.ok) {
      throw new Error("Failed to fetch lobbies");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
} 