import React, {  useEffect } from 'react';
import {v1} from 'uuid';
import {Todolist} from "./Todolist";
import {InputForm} from "./InputForm";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";

import axios from 'axios';
import Cookies from 'js-cookie';
import { StoreType, TodoState, serverPatch } from '../state';
import { ReceiveTodoAction, fetchTodoListsThunk } from "./todoReducer";
import { ThunkDispatch } from 'redux-thunk/es/types';



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

 const dispatch: ThunkDispatch<[], any, ReceiveTodoAction> = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoListsThunk())
  }, []);

  //добавление листа
const addTodolist = async (trimmedValue: string) => {
  try {
    const token = Cookies.get("token");
    const email = Cookies.get("email");
    if (token && email) {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const todoid = v1(); // Генерируйте уникальный идентификатор для нового тудулиста
      const newTodoList = {
        email: email,
        todoid: todoid,
        name: trimmedValue,
        filter: "all",
        tasks: [],
      };

      await axios.post(
        `${serverPatch}/todolists`,
        newTodoList,
        config
      );
    }
    dispatch(fetchTodoListsThunk());
  } catch (error) {
    console.error("Ошибка при добавлении тудулиста:", error);
  }
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
}

const Wrapper = styled.div`

`

const Lists = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`