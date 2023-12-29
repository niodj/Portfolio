import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4444");


interface ChatMessage {
  userName: string;
  message: string;
}

export const WebsocketChat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket.on("message", (payload: ChatMessage) => {
      setChat((prevChat) => [...prevChat, payload]);
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("message", { userName:'user', message });
    setMessage("");
  };

  return (
    <div className='App'>
      <h1>Welcome to chatter</h1>
      <form onSubmit={sendMessage}>
        <input
          type='text'
          name='message'
          placeholder='Type message'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        />
        <button type='submit'>Send</button>
      </form>
      {chat.map((payload, index) => (
        <h4 key={index}>
          {payload.userName}: <span>{payload.message}</span>
        </h4>
      ))}
    </div>
  );
};
