import { Modal, Button } from "react-bootstrap";
import s from "./TaskUpdatePopup.module.scss";
import {  useSelector } from "react-redux";
import {  StoreType } from "../../store";
import React, { useEffect, useRef, useState } from "react";


type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: (data: Data) => void;
  projectId: string;
  taskId: string;
};

type FormData = {
  data: Data,
  u:U
};

type Data = {

  title: string;
  description: string;
  user: string;
  priority: string;
  startDate: string;
  dueDate: string;
  status: string;
};
type U = {

  title: string;
  description: string;
  user: string;
  priority: string;
  startDate: string;
  dueDate: string;
  status: string;

};

export const TaskUpdatePopup = (props: PopupPropsType) => {
  const tasktracker = useSelector((state: StoreType) => state.tasktracker);
  const currproject = tasktracker.projects.find((item) => item.projectId === props.projectId)
  const currtask = currproject?.tasks.find((item) => item.taskId === props.taskId)

  const [state, setState] = useState<FormData>({
    data: {
      priority: "",
      user: "",
      status: "",
      title: "",
      startDate: "",
      dueDate: "",
      description: "",
    },
    u: {
      title: currtask?.title || "",
      description: currtask?.description || "",
      user: currtask?.user || "",
      priority: currtask?.user || "",
      startDate:
        currtask?.startDate ||
        new Date().toISOString().slice(0, 19).replace("T", " "),
      dueDate:
        currtask?.dueDate || "",
      status: currtask?.status || "",
    },
  });


  useEffect(() => {
    setState({
      data: {
        priority: "",
        user: "",
        status: "",
        title: "",
        startDate: "",
        dueDate: "",
        description: "",
      },
      u: {
        title: currtask?.title || "",
        description: currtask?.description || "",
        user: currtask?.user || "",
        priority: currtask?.priority || "",
        startDate:
          currtask?.startDate ||
          new Date().toISOString().slice(0, 19).replace("T", " "),
        dueDate: currtask?.dueDate || "",
        status: currtask?.status || "",
      },
    });
  }, [props.showPopup]);

  const titleRef = useRef<HTMLInputElement | null>(null);

  const onHide = () => {
    props.onHide();
  };

  const onSubmit = () => {
    if (state.u.title.trim() !== "") {
      let newData = {
        ...state.data,
        title: state.u.title,
        description: state.u.description,
        priority: state.u.priority,
        user: state.u.user,
        status: state.u.status,
        startDate: state.u.startDate,
        dueDate: state.u.dueDate,
      };
      setState((prevState) => ({
        ...prevState,
        data: newData,
      }));


      props.onConfirm(newData);
      props.onHide();;

      onHide();
    } else {
         titleRef.current?.focus();
    };
  }


    return (
      <div>
        <Modal
          show={props.showPopup}
          onHide={props.onHide}
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className={s.title}>New task# </Modal.Title>
          </Modal.Header>

          <Modal.Body className={s.modalWrapper}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className={s.form}
            >
              <div>
                <label>Title:</label>
                <input
                  ref={titleRef}
                  type='text'
                  value={state.u.title}
                  onChange={(e) => {
                    setState({
                      ...state,
                      u: { ...state.u, title: e.currentTarget.value },
                    });
                  }}
                  placeholder='Enter task title'
                />
              </div>

              <div>
                <label>Users:</label>
                <select
                  value={state.u.user}
                  onChange={(e) => {
                    setState({
                      ...state,
                      u: { ...state.u, user: e.currentTarget.value },
                    });
                  }}
                >
                  <option value={""} disabled>
                    {state.u.user}
                  </option>
                  {tasktracker.params.usersList.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Priority:</label>
                <select
                  value={state.u.priority}
                  onChange={(e) => {
                    setState({
                      ...state,
                      u: { ...state.u, priority: e.currentTarget.value },
                    });
                  }}
                >
                  <option value='' disabled>
                    {state.u.priority}
                  </option>
                  {tasktracker.params.priorityList.map(
                    (item: any, idx: number) => (
                      <option key={idx} value={item.title}>
                        {item.title}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label>Status:</label>
                <select
                  value={state.u.status}
                  onChange={(e) => {
                    setState({
                      ...state,
                      u: { ...state.u, status: e.currentTarget.value },
                    });
                  }}
                >
                  <option value='' disabled>
                    {state.u.status}
                  </option>
                  {tasktracker.params.statusList.map(
                    (item: any, idx: number) => (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label>Start date:</label>
                <input
                  type='datetime-local'
                  value={state.u.startDate}
                  onChange={(e) => {
                    setState({
                      ...state,
                      u: { ...state.u, startDate: e.currentTarget.value },
                    });
                  }}
                />
              </div>

              <div>
                <label>Due date:</label>
                <input
                  type='datetime-local'
                  value={state.u.dueDate}
                  onChange={(e) => {
                    setState({
                      ...state,
                      u: {
                        ...state.u,
                        dueDate: e.currentTarget.value.replace("T", " "),
                      },
                    });
                  }}
                />
              </div>

              <div>
                <label>Description:</label>
                <textarea
                  value={state.u.description}
                  onChange={(e) => {
                    setState({
                      ...state,
                      u: { ...state.u, description: e.currentTarget.value },
                    });
                  }}
                  placeholder='Enter task title'
                />
              </div>

              <div className={s.buttonContainer}>
                <Button type='submit' variant='primary'>
                  Submit
                </Button>
                <Button variant='secondary' onClick={() => onHide()}>
                  Cancel
                </Button>
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer className={s.modalFooter}></Modal.Footer>
        </Modal>
      </div>
    );
  };

