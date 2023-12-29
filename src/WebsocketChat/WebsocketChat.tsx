import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import s from './websocket.module.css'
import Input from "@mui/material/Input/Input";
import Button from "@mui/material/Button";

 type ChatMessage ={
  userName: string;
  message: string;
}

export const WebsocketChat = () => {
  const socket = io("http://localhost:4444");
  const [userName, setUserName] = useState('Admin');
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

const clearChat = () => {
  socket.emit("clearChat");
  };

  useEffect(() => {
    socket.on("chatCleared", () => {
      setChat([]);
    });
    
      socket.on("chatData", ({ messageHistory, newMessage }) => {
        setChat(messageHistory);
      });

    socket.on("message", (payload: ChatMessage) => {
      setChat((prevChat) => [...prevChat, payload]);
    });
    return () => {
      socket.off("messageHistory");
      socket.off("message");
    };
  }, []);

const sendMessage = (e: React.FormEvent) => {
  e.preventDefault();
  if (message.trim() !== "") {
    socket.emit("message", { userName, message });
    setMessage("");
  }
};

  return (
    <div className={s.wrapper}>
      <h3>Welcome to chatter</h3>
      <textarea
        value={chat
          .map((payload) => `${payload.userName}: ${payload.message}\n`)
          .join("")}
        readOnly
        rows={10}
        cols={50}
      />
      <Input
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      ></Input>
      :
      <Input
        placeholder='Type message'
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></Input>
      <Button onClick={sendMessage}>Send</Button>
      <Button onClick={clearChat}>Send</Button>
    </div>
  );
};
