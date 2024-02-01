import { Modal, Button } from "react-bootstrap";
import s from "./PopupAddProject.module.scss";
import { useDispatch } from "react-redux";
import { RootAction, StoreType, serverPatch } from "../../store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchProjectThunk } from "../thunksTaskTrackerActions";
import { ThunkDispatch } from "redux-thunk/es/types";

type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: (data: FormData) => void;
};

type FormData = {
  title: string;
  description: string;
  startDate: string;
};

export const PopupAddProject = (props: PopupPropsType) => {
  ////////react hook form
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 16);
    setValue("startDate", currentDate);
  }, []);

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
              <label>Project Title:</label>
              <input
                type='text'
                {...register("title", { required: true })}
                placeholder='Enter task title'
              />
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
