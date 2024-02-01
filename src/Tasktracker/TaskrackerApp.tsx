import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { RootAction, serverPatch, StoreType, TaskTrackerState } from "../store";
import { ThunkDispatch } from "redux-thunk/es/types";
import { fetchProjectThunk } from "./thunksTaskTrackerActions";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import s from "./Tasktracker.module.scss";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { PopupAddTask } from "./PopupAddTask/PopupAddTask";
import { PopupAddProject } from "./PopupAddProject/PopupAddProject";
import { v1 } from "uuid";
import { PopupUpdateTask } from "./PopupUpdateTask/PopupUpdateTask";
import { PopupUpdateParams } from "./PopupUpdateSettings/PopupUpdateParams";

export const TasktrackerApp = () => {
  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();
  const [socket] = useState(() => io(serverPatch));
  const [received, setReceived] = useState();
  const tasktracker = useSelector((state: StoreType) => state.tasktracker);
  const [addTaskPopapShow, setAddPopupShow] = useState(false);
  const [addUpdatePopapShow, setUpdatePopupShow] = useState(false);
  const [addProjectPopapShow, setAddProjectPopupShow] = useState(false);
  const [paramsPopapShow, setParamsPopupShow] = useState(false);
  const [projectId, setProjectId] = useState(tasktracker.projects[0]?.projectId??'');
  const [taskId, setTaskId] = useState(tasktracker.projects[0]?.tasks[0]?.taskId??'');
  //console.log('redux',tasktracker);
 //console.log('пришло с сервака',received);

  useEffect(() => {

    dispatch({ type: "LOADING" });
     socket.on("dataResponse", (data: any) => {
  //console.log("получено сокетом", data);
      setReceived(data);
      //show first project
      //data.projects.length!==0&&setProjectId(data.project[0]?.id)
     });
     dispatch(fetchProjectThunk(socket));
    dispatch({ type: "LOADED" });
  }, []);

  useEffect(() => {
    if (received) {
      console.log('вернулось с бека', received)
      dispatch({ type: "RECIVE-TASKS-TASKTRACKER", payload: received });
    }
  }, [received]);


  const updateParams = (params: any) => {
    socket.emit("updateParams", params);
    setParamsPopupShow(false);
  };
    const addProject = async (data: any) => {
    const newProject = {
      projectId: v1(),
      title: data.title,
      description: data.description,
      };
//console.log(newProject);
    socket.emit("addNewProject", newProject);
    setAddPopupShow(false);
  };

  const deleteProject = (projectId: string) => {
    try {
      socket.emit("deleteProject", projectId);
    } catch (error) {
      console.error("Ошибка при удалении проекта:", error);
    }
  };

  const addNewTask = (data: any) => {
    const newTaskTracker = {
      projectId: projectId,
      taskId: v1(),
      priority: data.priority,
      user: data.selectedUser,
      title: data.taskTitle,
      startDate: data.startDate,
      dueDate: data.dueDate,
      description: data.taskDescription,
      status: {
        date: data.startDate,
        user: data.user,
        status: "added",
        statusDescription: "",
      },
    };
    socket.emit("addTaskForTracker", newTaskTracker);
  };

  const deleteTask = (id: any) => {
    socket.emit("deleteTask", projectId, taskId);
  };
  const updateTask = (data: any) => {
    const updateTaskData = {
      projectId: projectId,
      taskId: taskId,
      priority: data.priority,
      user: data.selectedUser,
      title: data.taskTitle,
      startDate: data.startDate,
      dueDate: data.dueDate,
      description: data.taskDescription,
      status: {
        date: data.date,
        user: data.user,
        status: "added",
        statusDescription: "need Accountable person",
      },
    };
    socket.emit("updateTaskForTracker", updateTaskData);
  };

  return (
    <div className={s.wrapper}>
      <PopupUpdateParams
        showPopup={paramsPopapShow}
        onHide={() => setParamsPopupShow(false)}
        onConfirm={(data) => updateParams(data)}
      />
      {received ? (
        <>
          <PopupAddProject
            showPopup={addProjectPopapShow}
            onHide={() => setAddProjectPopupShow(false)}
            onConfirm={(data) => addProject(data)}
          />
          <PopupAddTask
            showPopup={addTaskPopapShow}
            onHide={() => setAddPopupShow(false)}
            onConfirm={(data) => addNewTask(data)}
          />
          <PopupUpdateTask
            showPopup={addUpdatePopapShow}
            onHide={() => setUpdatePopupShow(false)}
            onConfirm={(data) => updateTask(data)}
            current={{ projectId, taskId }}
          />

          <div>Tasktracker</div>
          <button
            onClick={() => {
              setAddProjectPopupShow(true);
            }}
          ></button>
          <Button
            variant='primary'
            onClick={() => setAddProjectPopupShow(true)}
          >
            Add new project
          </Button>
          <Button variant='primary' onClick={() => setParamsPopupShow(true)}>
            Setting
          </Button>

          {tasktracker.projects.map((item) => (
            <div key={item.projectId}>
              {item.title}
              <Button
                onClick={() => {
                  setAddPopupShow(true);
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
                <th>Actual status</th>
              </tr>
            </thead>
            <tbody>
              {tasktracker.projects
                .find((project) => project.projectId === projectId)
                ?.tasks.map((item: any) => (
                  <tr
                    key={item.id}
                    className={`${s[`priority-${item.priority}`]}`}
                  >
                    <td>
                      <MdOutlineDeleteForever
                        className={s.icon}
                        onClick={() => {
                          deleteTask(item.id);
                        }}
                      />
                      <CiEdit
                        className={s.icon}
                        onClick={() => {
                          setTaskId(item.id);
                          setUpdatePopupShow(true);
                        }}
                      />
                    </td>
                    <td>{item.priority}</td>

                    <td>{item.title}</td>
                    <td>
                      <div>
                        <div>start date {item.startDate}</div>
                        <div>due date {item.startDate}</div>
                      </div>
                    </td>
                    <td>{item.description}</td>
                    <td className={s.statusCell}>
                      <div>
                        {item.status[item.status.length - 1].statusdate}
                      </div>
                      <div>{item.status[item.status.length - 1].status}</div>
                      <div>
                        Person: &nbsp;
                        <span>{item.status[item.status.length - 1].user}</span>
                        &nbsp;
                        <div>
                          {
                            item.status[item.status.length - 1]
                              .statusDescription
                          }
                        </div>
                      </div>
                    </td>
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
