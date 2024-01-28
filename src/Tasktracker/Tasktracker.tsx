import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { RootAction, StoreType, serverPatch } from "../store";
import s from "./Tasktracker.module.scss";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { PopupAddTask } from "./PopupAddTask/PopupAddTask";
import { PopupProject } from "./PopupAddProject/PopupAddProject";
import { ThunkDispatch } from "redux-thunk";
import { deleteTaskThunk, fetchProjectThunk } from "./thunksTaskTrackerActions";
import { v1 } from "uuid";


export const Tasktracker = (props: any) => {
  const tasktrackers = useSelector((state: StoreType) => state.tasktrackers);
  const [addTaskPopapShow, setAddPopupShow] = useState(false);
  const [addProjectPopapShow, setAddProjectPopupShow] = useState(false);
  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();
  const [projectId, setProjectId] = useState(tasktrackers[0]?.id);


  const addProject = async (data: any) => {
    const newProject = {
      id: v1(),
      projectTitle: data.projectTitle,
      description: data.description,
    };
    props.socket.emit("addNewProject", newProject);
    setAddPopupShow(false);
  };

  const deleteProject =  (id: string) => {
    try {
      props.socket.emit("deleteProject", id);
      } catch (error) {
      console.error("Ошибка при удалении проекта:", error);
    }
  };


 const addNewTask = (data:any)=> {
    const newTaskTracker = {
      projectId: projectId,
      id: v1(),
      priority: data.priority,
      user: data.selectedUser,
      title: data.taskTitle,
      startDate: data.startDate,
      dueDate: data.dueDate,
      description: data.taskDescription,
      status: {
        statusdate: data.startDate,
        user: data.selectedUser,
        status: "added",
        statusDescription: "need Accountable person",
      },
    };
    props.socket.emit("addTaskForTracker", newTaskTracker);
  };

  const deleteTask =  (id: any) => {
     dispatch(deleteTaskThunk(projectId, id,props.socket))
    }

  const editTask = (id:any) => {};

  const send = async () => {
    await dispatch(fetchProjectThunk(props.socket));
  }

  console.log('f')
  return (
    <div className={s.wrapper}>
      <button onClick={send}>l</button>
      <PopupProject
        showPopup={addProjectPopapShow}
        onHide={() => setAddProjectPopupShow(false)}
        onConfirm={(data) => addProject(data)}
      />
      <PopupAddTask
        showPopup={addTaskPopapShow}
        onHide={() => setAddPopupShow(false)}
        onConfirm={(data) => addNewTask(data)}
      />
      <div>Tasktracker</div>
      <Button variant='primary' onClick={() => setAddProjectPopupShow(true)}>
        Add new project
      </Button>

      {tasktrackers.map((item) => (
        <div key={item.id}>
          {item.projectTitle}
          <Button
            onClick={() => {
             setAddPopupShow(true);
            }}
          >
            add task
          </Button>
          <Button
            onClick={() => {
              setProjectId(item.id);
            }}
          >
            show table
          </Button>
          <Button onClick={() => deleteProject(item.id)}>
            Delete {item.projectTitle}
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
          {tasktrackers
            .find((project) => project.id === projectId)
            ?.tasks.map((item: any) => (
              <tr key={item.id} className={`${s[`priority-${item.priority}`]}`}>
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
                      editTask(item.id);
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
                  <div>{item.status[item.status.length - 1].statusdate}</div>
                  <div>{item.status[item.status.length - 1].status}</div>
                  <div>
                    Person: &nbsp;
                    <span>{item.status[item.status.length - 1].user}</span>
                    &nbsp;
                    <div>
                      {item.status[item.status.length - 1].statusDescription}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
