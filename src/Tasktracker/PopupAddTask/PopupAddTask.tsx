import { Modal, Button } from "react-bootstrap";
import s from "./PopupAddTask.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootAction, StoreType } from "../../store";
import { useEffect} from "react";
import { useForm, } from "react-hook-form";

import { ThunkDispatch } from "redux-thunk/es/types";


type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: (data: FormData) => void;

};

type FormData = {
  title: string;
  description: string;
  user: string;
  priority: [];
  startDate: string;
  dueDate: string;
};

export const PopupAddTask = (props: PopupPropsType) => {

  const tasktracker = useSelector((state: StoreType) => state.tasktracker);
  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();

  ////////react hook form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();


  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 16);
    setValue("startDate", currentDate);
})
  ////////////////////////
  const onHide = () => {
    reset();
    props.onHide();
  };

   const onSubmit = (data: FormData) => {
     props.onConfirm(data);
     reset();
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
                {...register("title", { required: true })}
                placeholder='Enter task title'
              />
            </div>

            <div>
              <label>Accountable:</label>
              <select {...register("user", { required: true })}>
                <option value=''>Select user</option>
                {tasktracker.params.usersList.map((item: any) => (
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
                {tasktracker.params.priorityList.map(
                  (item: any, idx: number) => (
                    <option key={idx} value={item.title}>
                      {item.title}
                      {item.color}
                    </option>
                  )
                )}
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
                {...register("description")}
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

