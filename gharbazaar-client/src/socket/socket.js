import { io } from "socket.io-client";

export const socket = io("https://gharbazaar.gharbazaar.in", {
  withCredentials: true,
  autoConnect: true,
});