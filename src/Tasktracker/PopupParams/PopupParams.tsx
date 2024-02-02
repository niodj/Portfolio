import { Modal, Button } from "react-bootstrap";
import s from "./PopupParams.module.scss";
import { useSelector } from "react-redux";
import { StoreType } from "../../store";
import { useState } from "react";
import  { useRef } from "react";

import { RgbaStringColorPicker } from "react-colorful";

type PopupPropsType = {
  onHide: () => void;
  showPopup: boolean;
  onConfirm: (params: paramsType) => void;
};

type paramsType = {
  priorityList: { title: string; color: string }[];
  statusList: string[];
  usersList: string[];
};

type U = {
  inputPriority: string;
  errorPriority: boolean;
  inputColor: string;
  inputStatus: string;
  errorStatus: boolean;
  inputUser: string;
  errorUser: boolean;
};
type Formparams = {
  params: paramsType
  service: U;
};

export const PopupParams = (props: PopupPropsType) => {
  const tasktracker = useSelector((state: StoreType) => state.tasktracker);
  const [state, setState] = useState<Formparams>({
    params: {
      priorityList: tasktracker.params.priorityList ?? [],
      statusList: tasktracker.params.statusList ?? [],
      usersList: tasktracker.params.usersList ?? [],
    },
    service: {
      inputPriority: "",
      errorPriority: false,
      inputColor: "",
      inputStatus: "",
      errorStatus: false,
      inputUser: "",
      errorUser: false,
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
      state.params.usersList.length  > 0 &&
      state.params.statusList.length > 0 &&
      state.params.priorityList.length > 0
    ) {;
      // setState((prevState) => ({
      //   ...prevState,
      //   service: {
      //     ...prevState.service,
      //     errorPriority: false,
      //     errorStatus: false,
      //     errorUser:false
      //   },
      // }));

      props.onConfirm(state.params);
      props.onHide();
    } else {
      if (state.params.priorityList.length === 0) {
        priorityRef.current?.focus();
      }
      if (state.params.statusList.length === 0) {
        statusRef.current?.focus();
      }
      if (state.params.usersList.length === 0) {
        usersRef.current?.focus();
      }

      // setState((prevState) => ({
      //   ...prevState,
      //   service: {...prevState.service, errorPriority: true, errorStatus: true, errorUser:true}
      // }));
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
          <Modal.Title className={s.title}>paramsbase settings</Modal.Title>
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
                      color: state.service.inputColor,
                    };
                    setState((prevState) => ({
                      ...prevState,
                      params: {
                        ...prevState.params,
                        priorityList: [
                          ...prevState.params.priorityList,
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
              <RgbaStringColorPicker
                color={state.service.inputColor}
                onChange={(color) =>
                  setState({
                    ...state,
                    service: {
                      ...state.service,
                      inputColor: color,
                    },
                  })
                }
              />
            </div>

            <ul>
              {state.params.priorityList.map((priority, index) => (
                <li key={index}>
                  {priority.title}
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: priority.color,
                      border: "1px solid #000",
                    }}
                  ></div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setState({
                        ...state,
                        params: {
                          ...state.params,
                          priorityList: state.params.priorityList.filter(
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

            {/* g///////////////////////status///////////////////////////////////////////////////////////////////////// */}
            <div>
              <label>Set statu types:</label>
              <input
                ref={statusRef}
                type='text'
                placeholder='Enter new status type'
                value={state.service.inputStatus}
                onChange={(e) => {
                  setState({
                    ...state,
                    service: {
                      ...state.service,
                      inputStatus: e.currentTarget.value,
                    },
                  });
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (state.service.inputStatus.trim() !== "") {
                    setState((prevState) => {
                      return {
                        ...prevState,
                        params: {
                          ...prevState.params,
                          statusList: [
                            ...prevState.params.statusList,
                            prevState.service.inputStatus,
                          ],
                        },
                        service: { ...prevState.service, inputStatus: "" },
                      };
                    });
                  }
                }}
              >
                +
              </button>
              <ul>
                {state.params.statusList.map((status, index) => (
                  <li key={index}>
                    {status}{" "}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setState({
                          ...state,
                          params: {
                            ...state.params,
                            statusList: state.params.statusList.filter(
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
            </div>

            {/* ////////////users/////////// */}
            <div>
              <label>Create users:</label>
              <input
                ref={usersRef}
                type='text'
                placeholder='Add new user'
                value={state.service.inputUser}
                onChange={(e) =>
                  setState({
                    ...state,
                    service: {
                      ...state.service,
                      inputUser: e.currentTarget.value,
                    },
                  })
                }
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (state.service.inputUser.trim() !== "") {
                    setState((prevState) => {
                      return {
                        ...prevState,
                        params: {
                          ...prevState.params,
                          usersList: [
                            ...prevState.params.usersList,
                            prevState.service.inputUser,
                          ],
                        },
                        service: {
                          ...prevState.service,
                          inputUser: "",
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
              {state.params.usersList.map((user, index) => (
                <li key={index}>
                  {user}{" "}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setState({
                        ...state,
                        params: {
                          ...state.params,
                          usersList: state.params.usersList.filter(
                            (item: any) => item !== user
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
