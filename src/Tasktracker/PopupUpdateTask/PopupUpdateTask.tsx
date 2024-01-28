import { Modal, Button } from "react-bootstrap";
import s from "./PopupUpdateTask.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootAction, StoreType } from "../../store";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { ThunkDispatch } from "redux-thunk/es/types";


type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: (data: FormData) => void;
  current: {
    projectId?: string | undefined;
    taskId?: string | undefined;
  };
};


type FormData = {
  taskTitle: string;
  taskDescription: string;
  selectedUser: string;
  priority: string;
  startDate: string;
  dueDate: string;
};

export const PopupUpdateTask = (props: PopupPropsType) => {

  const tasktrackers = useSelector((state: StoreType) => state.tasktrackers);
  const currtask = tasktrackers.find((project:any)=>project.id===props.current.projectId)?.tasks.find((task:any)=>task.id===props.current.taskId)

  ////////react hook form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
console.log(currtask);
  useEffect(() => {
        const currentDate = new Date().toISOString().slice(0, 16);
   setValue("startDate", currentDate);
   setValue("taskTitle", currtask?.title ?? "");
   setValue("taskDescription", currtask?.description ?? "");
   setValue("selectedUser", currtask?.user ?? "");
   setValue("priority", currtask?.priority ?? "");
   setValue("dueDate", currtask?.dueDate ?? "");
},[])
  ////////////////////////
  const onHide = () => {

    props.onHide();
  };

   const onSubmit = (data: FormData) => {
     props.onConfirm(data);
     
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
          <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
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
              <select {...register("selectedUser", { required: true })}>
                <option value=''>Select user</option>
                {tasktrackers[0]?.users.map((item: any) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Priority:</label>
              <select {...register("priority", { required: true })}>
                <option value=''>Select priority</option>
                {tasktrackers[0]?.priorityList.map((item: any, idx: number) => (
                  <option key={idx} value={item}>
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
              <input type='datetime-local' {...register("dueDate")} />
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

