import { io } from "socket.io-client";

// Use environment variable for backend URL, fallback to production URL
const BACKEND_URL = import.meta.env.VITE_BASE_URL || "https://gharbazaar.gharbazaar.in";

export const socket = io(BACKEND_URL, {
  withCredentials: true,
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});