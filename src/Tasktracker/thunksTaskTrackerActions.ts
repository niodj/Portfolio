
import { RootAction, TaskTrackerState, serverPatch, thunkType } from "../store";
import { Dispatch } from "redux";
import { v1 } from "uuid";

// fetchProjectThunk
export const fetchProjectThunk = (socket:any) => {
  return async (dispatch: Dispatch<RootAction>): Promise<void> => {
    await socket.emit("getDataRequest");
    await socket.on("dataResponse", (received: any) => {
      console.log(received);
      dispatch({ type: "RECIVE-TASKS-TASKTRACKER", payload: received });
    });
  };
};

// delete task
export const deleteTaskThunk = (projectId: string, taskId: string,socket:any) => {
  return async (dispatch: Dispatch<RootAction>): Promise<void> => {
    socket.emit("deleteTask", projectId, taskId);
};
}