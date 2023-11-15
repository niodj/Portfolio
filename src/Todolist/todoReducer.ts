import Cookies from "js-cookie";
import { initialState, serverPatch } from "../state";
import { TodoType, TaskType } from "./TodolistApp";
import {v1} from "uuid";
import axios from "axios";
import {  Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";


export type ReceiveTodoAction = { type: "RECEIVE_TODO"; payload: TodoType[] };

export const todoReducer = (
  state: TodoType[] = [],
  action: ReceiveTodoAction
): TodoType[] => {
  switch (action.type) {
    case 'RECEIVE_TODO':
      return action.payload;
    default:
      return state;
  }
};

export const fetchTodoListsThunk = () => {

  return async (dispatch: Dispatch) => {
    //   return async (dispatch: Dispatch<ReceiveTodoAction>): Promise<void> => {
    try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get(
          `${serverPatch}/todolists/${email}`,
          config
        );
        dispatch({ type: "RECEIVE_TODO", payload: response.data });
      }
    } catch (error) {
      console.error("Ошибка при получении списка тудулистов:", error);
    }
  };
};



// export type ActionType =
//     RemoveListType
//     | AddTodoType
//     | AddTaskType
//     | RemoveTaskType
//     | CheckboxTogType
//     | FilterAllType
//     | FilterActiveType
//     | FilterCompletedType

// type RemoveListType = {
//     type: 'REMOVE-LIST';
//     idList: string;
// }//test
// type AddTodoType = {
//     type: 'ADD-TODO';
//     idList: string;
//     listTitle: string;
// }//test
// type AddTaskType = {
//     type: 'ADD-TASK';
//     idList: string;
//     taskTitle: string
// }//test
// type RemoveTaskType = {
//     type: 'REMOVE-TASK';
//     idList: string;
//     idTask: string
// }//test
// export type CheckboxTogType = {
//     type: 'CHECKBOX-TOG';
//     idList: string;
//     idTask: string;
// }//test
// type FilterAllType = {
//     type: 'FILTER-ALL';
//     idList: string;
// }
// type FilterActiveType = {
//     type: 'FILTER-ACTIVE';
//     idList: string;

// }
// type FilterCompletedType = {
//     type: 'FILTER-COMPLETED';
//     idList: string;

// }

// type FilterCompletedType = {
//   type: "RECIVE-TODO";
//   idList: string;
// };