import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { RootAction, serverPatch, StoreType } from "../store";
import { ThunkDispatch } from "redux-thunk/es/types";
import { fetchProjectThunk } from "./thunksTaskTrackerActions";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import s from "./Tasktracker.module.scss";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import { ProjectUpdatePopup } from "./ProjectUpdatePopup/ProjectUpdatePopup";
import { v1 } from "uuid";
import { PopupParams } from "./PopupParams/PopupParams";
import { TaskUpdatePopup } from "./PopupTaskPopup/TaskUpdatePopup";

export const TasktrackerApp = () => {
  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();
  const [socket] = useState(() => io(serverPatch));
  const [received, setReceived] = useState();
  const tasktracker = useSelector((state: StoreType) => state.tasktracker);
  //const [addTaskPopapShow, setAddTaskPopupShow] = useState(false);
  const [taskUpdatePopap, setTaskUpdatePopup] = useState(false);
  const [projectUpdatePopap, setProjectUpdatePopup] = useState(false);
  const [paramsPopapShow, setParamsPopupShow] = useState(false);

  const [projectId, setProjectId] = useState("");
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    dispatch({ type: "LOADING" });
    socket.on("dataResponse", (data: any) => {
      setReceived(data);
    });
    dispatch(fetchProjectThunk(socket));
    dispatch({ type: "LOADED" });
  }, []);

  useEffect(() => {
    if (received) {
      console.log("вернулось с бека", received);
      dispatch({ type: "RECIVE-TASKS-TASKTRACKER", payload: received });
    }
  }, [received]);

  // useEffect(() => {
  //   if (tasktracker.projects.length > 0) {
  //     setProjectId(tasktracker.projects[0]?.projectId ?? "");
  //   }
  // }, [tasktracker.projects]);

  // useEffect(() => {
  //   if (
  //     tasktracker.projects.length > 0 &&
  //     tasktracker.projects[0]?.tasks.length > 0
  //   ) {
  //     setTaskId(tasktracker.projects[0]?.tasks[0]?.taskId ?? "");
  //   }
  // }, [tasktracker.projects]);

  const updateParams = (params: any) => {
    socket.emit("updateParams", params);
    setParamsPopupShow(false);
  };

  const removeBase=() => {
    socket.emit("RemoveBase");
  }

  const UpdateProject = async (data: any) => {
    const newData = {
      ...data,projectId:projectId?projectId:v1()
    }
    socket.emit("UpdateProject", newData);
    setProjectUpdatePopup(false);
  };

  const deleteProject = (projectId: string) => {
    try {
      socket.emit("deleteProject", projectId);
    } catch (error) {
      console.error("Ошибка при удалении проекта:", error);
    }
  };

  console.log("projectId", projectId);
 // console.log("data", taskId);




  const updateTask = (data: any) => {

    const newData = { ...data, taskId: taskId || v1() };

    socket.emit("UpdateTask", projectId, newData);
  };
  const deleteTask = (id: any) => {
    socket.emit("DeleteTask", projectId, id);
  };



  return (
    <div className={s.wrapper}>
      <PopupParams
        showPopup={paramsPopapShow}
        onHide={() => setParamsPopupShow(false)}
        onConfirm={(data) => updateParams(data)}
        removeBase={removeBase}
      />
      {received ? (
        <>
          <ProjectUpdatePopup
            showPopup={projectUpdatePopap}
            onHide={() => setProjectUpdatePopup(false)}
            onConfirm={(data) => UpdateProject(data)}
            projectId={projectId}
          />
          <TaskUpdatePopup
            showPopup={taskUpdatePopap}
            onHide={() => setTaskUpdatePopup(false)}
            onConfirm={(data) => updateTask(data)}
            projectId={projectId}
            taskId={taskId}
          />

          <div>Tasktracker</div>

          <Button
            variant='primary'
            onClick={() => {
              setProjectId("");
              setProjectUpdatePopup(true);
            }}
          >
            Add new project
          </Button>
          <Button variant='primary' onClick={() => setParamsPopupShow(true)}>
            Setting
          </Button>

         {tasktracker.projects.map((item) => (
  <div key={item.projectId} className={`${s.projectTitle} ${item.projectId === projectId ? s.act : ''}`}>
    {item.title}


              <Button
                onClick={() => {
                  setProjectId(item.projectId);
                  setTaskId("");
                  setTaskUpdatePopup(true);
                }}
              >
                add task
              </Button>

              <Button
                onClick={() => {
                  setProjectId(item.projectId);
                }}
              >
                show table
              </Button>

              <Button
                onClick={() => {
                  setProjectId(item.projectId);
                  setProjectUpdatePopup(true);
                }}
              >
                update {item.title}
              </Button>
              <Button onClick={() => deleteProject(item.projectId)}>
                Delete {item.title}
              </Button>
            </div>
          ))}

          <table className={s.tableWrapper}>
            <thead>
              <tr>
                <th>Actions</th>
                <th>Priority</th>
                <th>Task title</th>
                <th>Dates</th>
                <th>Description</th>
                <th>User</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasktracker.projects
                .find((project) => project.projectId === projectId)
                ?.tasks.map((item: any) => (
                  <tr
                    style={{
                      backgroundColor: tasktracker.params.priorityList.find(
                        (color) => color.title === item.priority
                      )?.color,
                    }}
                  >
                    <td>
                      <MdOutlineDeleteForever
                        className={s.icon}
                        onClick={() => {
                          deleteTask(item.taskId);
                        }}
                      />
                      <CiEdit
                        className={s.icon}
                        onClick={() => {
                          setTaskId(item.taskId);
                          setTaskUpdatePopup(true);
                        }}
                      />
                    </td>
                    <td>{item.priority}</td>

                    <td>{item.title}</td>
                    <td>
                      <div>
                        <div>start date {item.startDate}</div>
                        <div>due date {item.dueDate}</div>
                      </div>
                    </td>
                    <td>{item.description}</td>
                    <td>{item.user}</td>
                    <td> {item.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <div>
          <Button
            onClick={() => {
              setParamsPopupShow(true);
            }}
          >
            Create database
          </Button>
        </div>
      )}
    </div>
  );
};
