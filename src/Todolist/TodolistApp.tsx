import React, { useEffect } from 'react';
import {v1} from 'uuid';
import {Todolist} from "./Todolist";
import {InputForm} from "./InputForm";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";

import axios from 'axios';
import Cookies from 'js-cookie';
import { serverPatch } from '../store';

export type TaskType = {
    idTask: string;
    taskTitle: string;
    isDone: boolean;
};

export type StateType = {
    idList: string;
    listTitle: string;
    filter: string;
    tasks: TaskType[];
};

 //получение тудулиста
      export const fetchTodoListsByUserId = async () => {
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
            return response.data;
          }
        } catch (error) {
          console.error("Ошибка при получении списка тудулистов:", error);
        }
      };

export const TodolistApp = () => {

 const todoLists = useSelector((state: any) => state.todolists);
  const dispatch = useDispatch();

  useEffect(() => { fetchTodoListsByUserId().then((data) => { dispatch({ type: "RECIVE-TODO", payload: data }) }) }, [dispatch]);

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

      const response = await axios.post(
        `${serverPatch}/todolists`,
        newTodoList,
        config
      );
    } fetchTodoListsByUserId().then((data) => {
      dispatch({ type: "RECIVE-TODO", payload: data });
    });
  } catch (error) {
    console.error("Ошибка при добавлении тудулиста:", error);
  }
};


    return (
      <Wrapper>
        <h4>
          this component works with the node js server, with cloud MongoDB
        </h4>
        <InputForm addFromInput={addTodolist} defaultInput={"New list"} />
        <Lists>
          {todoLists.map((item: any) => (
            <Todolist
              key={item.todoid}
              idList={item.todoid}
              listTitle={item.name}
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