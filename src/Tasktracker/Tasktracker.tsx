import Button from "react-bootstrap/Button";
import { styled } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { StoreType } from "../store";
import s from "./Tasktracker.module.scss";
import { MdOutlineDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { PopupAddTask } from "./PopupAddTask/PopupAddTask";


export const Tasktracker = () => {
  const tasks = useSelector((state: StoreType) => state.tasktracker.tasks);
  const [addTaskPopapShow, setAddPopupPopupShow] = useState(false);
  const addTask = () => {};
  const deleteTask = (id:any) => {alert("d")};
  const editTask = (id:any) => {};


  return (
    <div className={s.wrapper}>
      <PopupAddTask
        showPopup={addTaskPopapShow}
        onHide={() => setAddPopupPopupShow(false)}
        onConfirm={() => setAddPopupPopupShow(false)}
      />
      <div>Tasktracker</div>
      <Button variant='primary' onClick={() => setAddPopupPopupShow(true)}>
        Add task
      </Button>

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
          {tasks.map((item: any) => (
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
