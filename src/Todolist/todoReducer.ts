import {StateType, TaskType} from "./TodolistApp";
import {v1} from "uuid";
import {initialState} from "../store";

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

export const todoReducer = (state: any=initialState.todolists, action: any): any => {

    switch (action.type) {
           case 'RECIVE-TODO':
            return action.payload !== undefined && action.payload !== null
        ? action.payload
        : state;
        default: return  state;
    }
}

