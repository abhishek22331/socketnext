import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const Home2 = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [roomMessages, setRoomMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  console.log(message, "message");
  console.log(username, "username");
  console.log(roomName, "roomName");
  console.log(roomMessages, "roomMessages111");
  console.log(selectedRoom, "selectedRoom");
  useEffect(() => {
    socketInitializer();
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket2");

    socket = io();
    console.log(socket, "sosooso");
    socket.on("receive-message", (data) => {
      if (data.room === selectedRoom) {
        setRoomMessages((prev) => [...prev, data]);
      }
    });

    socket.on("join-room", (room) => {
      setSelectedRoom(room); // Set the selected room
      console.log(`Joined room: ${room}`);
      setRoomMessages([]); // Clear room-specific messages when joining a new room
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = { username, message, room: selectedRoom }; // Use the selected room
    socket.emit("send-message", data);
    setMessage("");
  }

  function joinRoom() {
    socket.emit("join-room", roomName);
  }

  return (
    <div>
      <h1>Chat app</h1>
      <h1>Enter a username</h1>

      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <br />
      <br />

      <input
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Enter Room Name"
      />

      <button onClick={joinRoom}>Join Room</button>

      <br />
      <br />

      <div>
        {roomMessages.map(({ username, message }, index) => (
          <div key={index}>
            {username}: {message}
          </div>
        ))}

        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div>
    </div>
  );
};

export default Home2;
