import { Modal, Button } from "react-bootstrap";
import s from "./PopupUpdateTask.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootAction, StoreType } from "../../store";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: (date: Data) => void;
  current: {
    projectId?: string | undefined;
    taskId?: string | undefined;
  };
};


 type Data = {

    taskTitle: string;
    taskDescription: string;
    user: string;
    priority: string;
    startDate: string;
    dueDate: string;

};

 type Service = {
   inputTitle: string;
   selectUser: string;
   selectPriority: string;
   inputStartDate: string;
   inputDueDate: string;
   inputDescription:string
 };
type FormData = {
  data: Data;
  service: Service;

};

export const PopupUpdateTask = (props: PopupPropsType) => {
  const tasktracker = useSelector((state: StoreType) => state.tasktracker);
  const currtask = tasktracker.projects
    .find((project: any) => project.projectId === props.current.projectId)
    ?.tasks.find((task: any) => task.taskId === props.current.taskId);

const currDate = new Date().toISOString().slice(0, 16).replace("T", " ")
  const [state, setState] = useState<FormData>({
    data: {
      taskTitle: currtask?.title ?? "",
      taskDescription: currtask?.description ?? "",
      user: currtask?.user ?? "",
      priority: currtask?.priority ?? "",
      startDate: currDate,
      dueDate: currtask?.dueDate ?? "",
    },
    service: {
      inputTitle: "",
      selectUser: "-",
      selectPriority: "-",
      inputStartDate: currDate,
      inputDueDate: currDate,
      inputDescription:''
    },
  });

  ////////////////////////
  const onHide = () => {
    props.onHide();
  };

  const onSubmit = () => {
    props.onConfirm(state.data);
    onHide();
  };

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
                type='text'
                value={state.data.taskTitle}
                onChange={(e) => {}}
                placeholder='Enter task title'
              />
            </div>

            <div>
              <label>Accountable:</label>
              <select>
                <option value={state.service.selectUser}>Select user</option>
                {tasktracker.params.usersList.map((item: any) => (
                  <option key={item.id} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Priority:</label>
              <select>
                <option value={state.service.selectPriority}>
                  Select user
                </option>
                {tasktracker.params.priorityList.map((item: any) => (
                  <option key={item.id} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Start date:</label>
              <input
                type='datetime-local'
                value={state.service.inputStartDate}
              />
            </div>

            <div>
              <label>Due date:</label>
              <input
                type='datetime-local'
                value={state.service.inputDueDate}
              />
            </div>

            <div>
              <label>Description:</label>
              <textarea
               value={state.service.inputDescription}
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
