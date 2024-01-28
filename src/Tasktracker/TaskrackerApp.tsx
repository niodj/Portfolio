import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Tasktracker } from "./Tasktracker";
import { useDispatch } from "react-redux";
import { RootAction, serverPatch, StoreType } from "../store";
import { ThunkDispatch } from "redux-thunk/es/types";
import { fetchProjectThunk } from "./thunksTaskTrackerActions";

export const TasktrackerApp = () => {
  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();
  const [socket] = useState(() => io(serverPatch));
  const [received, setReceived] = useState();

 useEffect(() => {
  socket.on("dataResponse", (data: any) => {
     setReceived(data);
   });
dispatch(fetchProjectThunk(socket));
 }, []);

  useEffect(() => {
    if (received !== undefined) {
      dispatch({ type: "RECIVE-TASKS-TASKTRACKER", payload: received });
    }
  }, [received]);

  return <>{socket && <Tasktracker socket={socket} />}</>;
};
