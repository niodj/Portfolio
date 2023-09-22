import {StateType, TaskType} from "./TodolistApp";
import {v1} from "uuid";
import {initialState} from "../store";

export type ActionType =
    RemoveListType
    | AddTodoType
    | AddTaskType
    | RemoveTaskType
    | CheckboxTogType
    | FilterAllType
    | FilterActiveType
    | FilterCompletedType

type RemoveListType = {
    type: 'REMOVE-LIST';
    idList: string;
}//test
type AddTodoType = {
    type: 'ADD-TODO';
    idList: string;
    listTitle: string;
}//test
type AddTaskType = {
    type: 'ADD-TASK';
    idList: string;
    taskTitle: string
}//test
type RemoveTaskType = {
    type: 'REMOVE-TASK';
    idList: string;
    idTask: string
}//test
export type CheckboxTogType = {
    type: 'CHECKBOX-TOG';
    idList: string;
    idTask: string;
}//test
type FilterAllType = {
    type: 'FILTER-ALL';
    idList: string;
}
type FilterActiveType = {
    type: 'FILTER-ACTIVE';
    idList: string;

}
type FilterCompletedType = {
    type: 'FILTER-COMPLETED';
    idList: string;

}

export const todoReducer = (state: StateType[]=initialState.todolists, action: ActionType): StateType[] => {

    switch (action.type) {
        case 'REMOVE-LIST':
            return state.filter(item => item.idList !== action.idList);
            case 'ADD-TODO':
            return [...state, {
                idList: action.idList,
                listTitle: action.listTitle ?? '',
                filter: 'all',
                tasks: []
            }];


        case 'ADD-TASK':
            return state.map((item) =>
                (action.idList === item.idList ? {
                    ...item,
                    tasks: [...item.tasks, {
                        idTask: v1(),
                        taskTitle: action.taskTitle ?? '',
                        isDone: false
                    }]
                } : item))

        case 'REMOVE-TASK':
            return state.map((item: StateType) => item.idList === action.idList ? {
                ...item,
                tasks: item.tasks.filter((task: TaskType) => task.idTask !== action.idTask)
            } : item)


        case 'CHECKBOX-TOG':
            return state.map((item: StateType) =>
                item.idList === action.idList
                    ? {
                        ...item,
                        tasks: item.tasks.map((task: TaskType) =>
                            task.idTask === action.idTask
                                ? {...task, isDone: !task.isDone}
                                : task
                        ),
                    }
                    : item
            );
        default: return  state;
    }
}
