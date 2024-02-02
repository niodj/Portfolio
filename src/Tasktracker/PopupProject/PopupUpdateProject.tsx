import { Modal, Button } from "react-bootstrap";
import s from "./PopupUpdateProject.module.scss";
import {  useSelector } from "react-redux";
import {  StoreType } from "../../store";
import { useRef, useState } from "react";
import { v1 } from "uuid";
import { prevState } from "../../SocialNetwork/prevState";


type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: (data: Data) => void;
  projectId:string
};

type Data = {
  projectId:string
  title: string;
  desription: string;
};
type U = {
  inputTitle: string;
  inputDesription: string;
};
type FormData = {
  data: Data;
  u: U;
};

export const PopupUpdateProject = (props: PopupPropsType) => {
  const tasktracker = useSelector((state: StoreType) => state.tasktracker);
  const currProject = tasktracker.projects.find(
    (item) => item.projectId === props.projectId
  );

  const [state, setState] = useState<FormData>({
    data: {
      projectId: currProject?.projectId || "",
      title: currProject?.title || "",
      desription: currProject?.description || "",
    },
    u: {
      inputTitle: "",
      inputDesription: "",
    },
  });
  const titleRef = useRef<HTMLInputElement | null>(null);

  const onHide = () => {
    props.onHide();
  };

const onSubmit = () => {
  if (state.u.inputTitle.length > 0) {
    let newData = {
      ...state.data,
      title: state.u.inputTitle,
      desription: state.u.inputDesription
    };

    if (currProject) {
       newData = { ...newData, projectId: props.projectId };
    } else {
     newData = { ...newData, projectId: v1() };
    }

setState((prevState) => ({
  ...prevState,
  data: newData,
}));

    console.log(state.data);
    props.onConfirm(newData);
    props.onHide();
  } else {
    if (state.u.inputTitle.length === 0) {
      titleRef.current?.focus();
    }
  }
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
              <label>Project Title:</label>
              <input
                type='text'
                value={state.u.inputTitle}
                ref={titleRef}
                onChange={(e) => {

                  setState({
                    ...state, u: { ...state.u, inputTitle: e.currentTarget.value },
                  })}}
                placeholder='Enter project title'
              />
            </div>

            <div>
              <label>Description:</label>
              <textarea
                placeholder='Enter description'
                onChange={(e) => {
                  setState({
                    ...state,
                    u: { ...state.u, inputDesription: e.currentTarget.value },
                  });
                }}
                value={state.u.inputDesription}
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
