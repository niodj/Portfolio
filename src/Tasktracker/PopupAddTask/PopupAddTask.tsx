import { Modal, Button } from "react-bootstrap";
import s from "./PopupAddTask.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../store";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { userEvent } from "@storybook/testing-library";

type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: () => void;
};

type FormData = {
  taskTitle: string;
  taskDescription: string;
  selectedUser: string;
  priority: string;
  startDate: string;
  dueDate: string;
};

export const PopupAddTask = (props: PopupPropsType) => {
  const tasktracker = useSelector((state: StoreType) => state.tasktracker);
  const dispatch = useDispatch();

  ////////react hook form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

const updateDate = ()=>{    const currentDate = new Date().toISOString().slice(0, 16);
setValue("startDate", currentDate);}

  useEffect(() => {
  updateDate()
})

  ////////////////////////
  const onHide = () => {
    // Reset form state after submitting
    reset();
    props.onHide();
  };

  const addtask = (data: FormData) => {
    console.log(data)
    reset()
    dispatch({type: "ADD-TASK-TASKTRACKER",});
    onHide();
  };
console.log(tasktracker.priorityList);
  return (
    <div>
      <Modal
        show={props.showPopup}
        onHide={props.onHide}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className={s.title}>
            New task#{" "}
            {tasktracker.tasks.length
              ? tasktracker.tasks[tasktracker.tasks.length - 1].id + 1
              : ""}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={s.modalWrapper}>
          <form onSubmit={handleSubmit(addtask)} className={s.form}>
            <div>
              <label>Title:</label>
              <input
                type='text'
                {...register("taskTitle", { required: true })}
                placeholder='Enter task title'

              />
            </div>

            <div>
              <label>Accountable:</label>
              <select
                {...register("selectedUser", { required: true })}

              >
                <option value=''>Select user</option>
                {tasktracker.users.map((item: any) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Priority:</label>
              <select
                {...register("priority", { required: true })}

              >
                <option value=''>Select priority</option>
                {tasktracker.priorityList.map((item: any) => (
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
                {...register("startDate", { required: true })}

              />
            </div>

            <div>
              <label>Due date:</label>
              <input
                type='datetime-local'
                {...register("dueDate")}

              />
            </div>

            <div>
              <label>Description:</label>
              <textarea
                {...register("taskDescription")}
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
