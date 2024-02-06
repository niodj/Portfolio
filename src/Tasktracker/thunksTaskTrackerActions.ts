// fetchProjectThunk
export const fetchProjectThunk = (socket: any) => {
  //////
  return async () => {
    socket.emit("getDataRequest");
  };
  ////   dispatch({ type: "RECIVE-TASKS-TASKTRACKER", payload: received });
  ////////
};
