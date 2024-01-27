import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootAction, serverPatch } from "../store";
import { ThunkDispatch } from "redux-thunk/es/types";
import { fetchProjectThunk } from "./thunksTaskTrackerActions";
import { io, Socket } from "socket.io-client";
import { Tasktracker } from "./Tasktracker";

export const TasktrackerApp = () => {
  
  const dispatch: ThunkDispatch<any, any, RootAction> = useDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Инициализация сокета при монтировании компонента
    const newSocket = io(serverPatch);
    setSocket(newSocket);
 dispatch(fetchProjectThunk(socket));
    // Очистка сокета при размонтировании компонента
    return () => {
      if (newSocket) {
        newSocket.disconnect();
        setSocket(null);
      }
    };
  }, []);

  return <>{socket && <Tasktracker socket={socket} />}</>;
};

