import { Modal, Button } from "react-bootstrap";
import s from "./ProjectUpdatePopup.module.scss";
import {  useSelector } from "react-redux";
import {  StoreType } from "../../store";
import { useEffect, useRef, useState } from "react";




type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: (data: Data) => void;
  projectId:string
};

type Data = {
   title: string;
  description: string;
};
type U = {
  inputTitle: string;
  inputDescription: string;
};
type FormData = {
  data: Data;
  u: U;
};

export const ProjectUpdatePopup = (props: PopupPropsType) => {

  const tasktracker = useSelector((state: StoreType) => state.tasktracker);
  const currProject = tasktracker.projects.find(
    (item) => item.projectId === props.projectId
  );

  const [state, setState] = useState<FormData>({
    data: {
      title: "",
      description: "",
    },
    u: {
      inputTitle:  "",
      inputDescription:"",
    },
  });
 useEffect(() => {
   setState((prevState) => ({
     ...prevState,
     u: {
       inputTitle: currProject?.title || "",
       inputDescription: currProject?.description || "",
     },
   }));
 }, [props.showPopup]);

  const titleRef = useRef<HTMLInputElement | null>(null);

  const onHide = () => {
    props.onHide();
  };

  const onSubmit = () => {
    if (state.u.inputTitle.length > 0) {
      let newData = {
        ...state.data,
        title: state.u.inputTitle,
        description: state.u.inputDescription,
      };


      setState((prevState) => ({
        ...prevState,
        data: newData,
      }));


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
                    ...state,
                    u: { ...state.u, inputTitle: e.currentTarget.value },
                  });
                }}
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
                    u: { ...state.u, inputDescription: e.currentTarget.value },
                  });
                }}
                value={state.u.inputDescription}
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
