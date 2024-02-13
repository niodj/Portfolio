import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import s from './websocket.module.css'
import Input from "@mui/material/Input/Input";
import Button from "@mui/material/Button";
import { StoreType, serverPatch } from "../store";
import { useSelector } from "react-redux";


type ChatMessage = {
      userName: string;
  message: string}[]

export const WebsocketChat: React.FC = () => {
  const [socket] = useState(() => io(serverPatch));
  const [received, setReceived] = useState<ChatMessage>([]);
  const [userName, setUserName] = useState("Admin");
  const [message, setMessage] = useState("");


  useEffect(() => {
    socket.on("chatData", (data: ChatMessage) => {
      setReceived(data);
    });
    return () => {
      socket.off();
    };
  }, []);


  const dark = useSelector((state: StoreType) => state.appProp.dark);
  const sendMessage = (e: any) => {
    if (message.trim() !== "") {
      socket.emit("message", { userName, message });
      setMessage("");
    }
  };
   const clearChat = () => {socket.emit("clearChat")};
console.log(received)
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
        style={{
          backgroundColor: `${dark ? "black" : ""}`,
          color: `${dark ? "white" : ""}`,
        }}
        value={
          Array.isArray(received)
            ? received
                .map((payload) => `${payload.userName}: ${payload.message}\n`)
                .join("")
            : ""
        }
        readOnly
        rows={10}
        cols={50}
      />
      <div>
        User name:{" "}
        <Input
          style={{
            backgroundColor: `${dark ? "grey" : ""}`,
            color: `${dark ? "white" : ""}`,
          }}
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></Input>
      </div>

      <Input
        style={{
          backgroundColor: `${dark ? "grey" : ""}`,
          color: `${dark ? "white" : ""}`,
        }}
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
