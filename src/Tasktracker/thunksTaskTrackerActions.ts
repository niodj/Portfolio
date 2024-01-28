// fetchProjectThunk
export const fetchProjectThunk = (socket: any) => {
  return async ()=> {
    socket.emit("getDataRequest");
    console.log('cанка запрос данных')
  };
};


// delete task
export const deleteTaskThunk = (projectId: string, taskId: string,socket:any) => {
  return async ()=> {
    socket.emit("deleteTask", projectId, taskId);
};
}