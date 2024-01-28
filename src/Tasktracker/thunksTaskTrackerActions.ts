// fetchProjectThunk
export const fetchProjectThunk = (socket: any) => {
  return async ()=> {
    socket.emit("getDataRequest");
  };
};
