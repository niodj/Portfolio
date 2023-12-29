import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import s from './websocket.module.css'
import Input from "@mui/material/Input/Input";
import Button from "@mui/material/Button";
import { serverPatch } from "../store";

 type ChatMessage ={
  userName: string;
  message: string;
}
export const WebsocketChat: React.FC = () => {
  // Инициализация соединения с сервером WebSocket
  const [socket] = useState(() => io(serverPatch));

  // Состояния для имени пользователя, введенного сообщения и истории чата
  const [userName, setUserName] = useState("Admin");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  const clearChat = () => {socket.emit("clearChat")};
  const handleChatCleared = () => {setChat([])};
  const handleChatData = ({ messageHistory, }: { messageHistory: ChatMessage[]; }) => { setChat(messageHistory); };

// Обработчик события для получения нового сообщения
    const handleMessage = (payload: ChatMessage) => {setChat((prevChat) => [...prevChat, payload])};

  // Эффект React для подписки на события WebSocket при монтировании компонента
  useEffect(() => {
      // Подписываемся на события сервера WebSocket
    socket.on("chatData", handleChatData);
    socket.on("message", handleMessage);
    socket.on("chatCleared", handleChatCleared);

    // Отписываемся от событий при размонтировании компонента
    return () => {
      socket.off("chatCleared", handleChatCleared);
      socket.off("chatData", handleChatData);
      socket.off("message", handleMessage);
    };
  }, [socket]);

  // Функция для отправки нового сообщения
  const sendMessage = (e: any) => {
    if (message.trim() !== "") {
      socket.emit("message", { userName, message });
      setMessage("");
    }
  };

  return (
    <div className={s.wrapper}>
      <h4>
        This chat operates on WebSockets. If you{" "}
        <a href={window.location.href} target='_blank'>
          open new multiple tabs
        </a>
        , the messages will be instantly synchronized.
      </h4>
      <textarea
        value={chat
          .map((payload) => `${payload.userName}: ${payload.message}\n`)
          .join("")}
        readOnly
        rows={10}
        cols={50}
      />
      <div>
        User name:{" "}
        <Input
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></Input>
      </div>

      <Input
        placeholder='Type message'
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></Input>

      <Button onClick={sendMessage}>Send</Button>
      <Button onClick={clearChat}>Clear Chat</Button>
    </div>
  );
};
