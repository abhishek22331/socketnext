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
      io.to(data.room).emit("receive-message", data);
      console.log("Received message:", data);
    });
  
    socket.on("join-room", (room) => {
      socket.join(room);
      io.to(socket.id).emit("join-room", room);
      console.log(`Joined room: ${room}`);
      // Optionally, you can broadcast a message to the room to notify others in the room:
      io.to(room).emit("receive-message", {
        username: "System",
        message: `User ${socket.id} has joined the room.`,
        room,
      });
    });
  });

  console.log("Setting up socket");
  res.end();
}
