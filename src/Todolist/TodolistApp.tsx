import React, { useEffect } from "react";
import { v1 } from "uuid";
import { Todolist } from "./Todolist";
import { InputForm } from "./InputForm";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import Cookies from "js-cookie";
import { StoreType, TodoState, serverPatch } from "../state";

import { ThunkDispatch } from "redux-thunk/es/types";
import {  addTodoListThunk, fetchTodoListsThunk } from "./thunksActions";
import { ReceiveTodoAction } from "./todoReducer";

export type TaskType = {
  taskid: string;
  name: string;
  checked: boolean;
};

export type TodoType = {
  todoid: string;
  name: string;
  filter: string;
  tasks: TaskType[];
};

export const TodolistApp = () => {
  const todoLists = useSelector((state: StoreType) => state.todolists);

  const dispatch: ThunkDispatch<StoreType, any, ReceiveTodoAction> =
    useDispatch();

  //получение тудулистов
  useEffect(() => {
    dispatch(fetchTodoListsThunk());
  
  }, []);

  //добавление листа
  const addTodolist = async (trimmedValue: string) => {
    await dispatch(addTodoListThunk( trimmedValue));
    await dispatch(fetchTodoListsThunk());
  };

  return (
    <Wrapper>
      <h4>
        this component works with the node js server on AWS Linux. Database is
        MongoDB
      </h4>
      <InputForm addFromInput={addTodolist} defaultInput={"New list"} />
      <Lists>
        {todoLists.map((item: TodoType) => (
          <Todolist
            key={item.todoid}
            todoid={item.todoid}
            name={item.name}
            filter={item.filter}
            tasks={item.tasks}
          />
        ))}
      </Lists>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Lists = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
