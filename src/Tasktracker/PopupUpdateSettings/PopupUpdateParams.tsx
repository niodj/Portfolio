import { Modal, Button } from "react-bootstrap";
import s from "./PopupUpdateParams.module.scss";
import { useSelector } from "react-redux";
import { StoreType } from "../../store";
import { useState } from "react";
import React, { useRef, useEffect } from "react";
import { v1 } from "uuid";

type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: (data: DataType) => void;
};

type DataType = {
  priorityList: { title: string; color: string }[];
  statusList: string[];
  usersList: string[];
};
type FormData = {
  data: {
    priorityList: { title: string; color: string }[];
    statusList: string[];
    usersList: string[];
  };
  service: {
    inputPriority: string;
    errorPriority: boolean;
    inputStatus: string;
    errorStatusList: boolean;
    inputName: string;
    errorName: boolean;
    inputAccessGroup: string;
    errorAccessGroup: boolean;
  };
};

export const PopupUpdateParams = (props: PopupPropsType) => {
  const tasktracker = useSelector((state: StoreType) => state.tasktracker);
  const [state, setState] = useState<FormData>({
    data: {
      priorityList: tasktracker.params.priorityList ?? [],
      statusList: tasktracker.params.statusList ?? [],
      usersList: tasktracker.params.usersList ?? [],
    },
    service: {
      inputPriority: "",
      errorPriority: false,
      inputStatus: "",
      errorStatusList: false,
      inputName: "",
      errorName: false,
      inputAccessGroup: "",
      errorAccessGroup: false,
    },
  });

  const priorityRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLInputElement | null>(null);
  const usersRef = useRef<HTMLInputElement | null>(null);

  ////////////////////////
  const onHide = () => {
    props.onHide();
  };

  const onSubmit = () => {
    if (
      state.data.priorityList.length > 0 ||
      state.data.statusList.length > 0 ||
      state.data.usersList.length > 0
    ) {
      setState((prevState) => ({
        ...prevState,
        service: {
          ...prevState.service,
          errorPriority: false,
          errorStatusList: false,
        },
      }));

      props.onConfirm(state.data);
      props.onHide();
    } else {
      if (state.data.priorityList.length === 0) {
        priorityRef.current?.focus();
      }
      if (state.data.statusList.length === 0) {
        statusRef.current?.focus();
      }

      setState((prevState) => ({
        ...prevState,
        service: {
          ...prevState.service,
          errorPriority: true,
          errorStatusList: true,
        },
      }));
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
          <Modal.Title className={s.title}>Database settings</Modal.Title>
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
              <label>Set type of priorities:</label>
              <input
                ref={priorityRef}
                type='text'
                placeholder='Enter new priority type'
                value={state.service.inputPriority}
                onChange={(e) =>
                  setState({
                    ...state,
                    service: {
                      ...state.service,
                      inputPriority: e.currentTarget.value,
                    },
                  })
                }
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const inputPriority = state.service.inputPriority;
                  if (inputPriority.trim() !== "") {
                    const newPriority = {
                      title: inputPriority,
                      color: "defaultColor",
                    };
                    setState((prevState) => ({
                      ...prevState,
                      data: {
                        ...prevState.data,
                        priorityList: [
                          ...prevState.data.priorityList,
                          newPriority,
                        ],
                      },
                      service: {
                        ...prevState.service,
                        inputPriority: "",
                        errorPriority: false,
                      },
                    }));
                  }
                }}
              >
                +
              </button>
            </div>

            <ul>
              {state.data.priorityList.map((priority, index) => (
                <li key={index}>
                  {priority.title} {priority.color}
                  {"red"}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setState({
                        ...state,
                        data: {
                          ...state.data,
                          priorityList: state.data.priorityList.filter(
                            (item: any) => item !== priority
                          ),
                        },
                      });
                    }}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>

            {/* g//////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div>
              <label>Set status type:</label>
              <input
                ref={statusRef}
                type='text'
                placeholder='Enter new status type'
                value={state.service.inputStatus}
                onChange={(e) =>
                  setState({
                    ...state,
                    service: {
                      ...state.service,
                      inputStatus: e.currentTarget.value,
                    },
                  })
                }
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (state.service.inputStatus.trim() !== "") {
                    setState((prevState) => {
                      return {
                        ...prevState,
                        data: {
                          ...prevState.data,
                          statusList: [
                            ...prevState.data.statusList,
                            prevState.service.inputStatus,
                          ],
                        },
                        service: {
                          ...prevState.service,
                          inputStatus: "",
                        },
                      };
                    });
                  }
                }}
              >
                +
              </button>
            </div>

            <ul>
              {state.data.statusList.map((status, index) => (
                <li key={index}>
                  {status}{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setState({
                        ...state,
                        data: {
                          ...state.data,
                          statusList: state.data.statusList.filter(
                            (item: any) => item !== status
                          ),
                        },
                      });
                    }}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>

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

