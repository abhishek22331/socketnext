
import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("send-message", (data) => {
      io.emit("receive-message", data); 
      console.log("Received message:", data);
    });
  });

  console.log("Setting up socket");
  res.end();
}