import Cookies from "js-cookie";
import { initialState, serverPatch } from "../state";
import { TodoType, TaskType } from "./TodolistApp";
import { v1 } from "uuid";
import axios from "axios";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";


export type ReceiveTodoAction = { type: "RECEIVE_TODO"; payload: TodoType[] };

export type combiActions = ReceiveTodoAction;


export const todoReducer = (
  state: TodoType[] = [],
  action: ReceiveTodoAction
): TodoType[] => {
  switch (action.type) {
    case "RECEIVE_TODO":
      return action.payload;
    default:
      return state;
  }
};
