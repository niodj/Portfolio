import React, { useEffect, useState } from "react";

import { Tasks } from "./Tasks";
import { InputForm } from "./InputForm";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootAction, StoreType } from "../state";
import { ThunkDispatch } from "redux-thunk/es/types";
import { addTodoListThunk, fetchTodoListsThunk } from "./thunksActions";
import { Isloading } from "../tools/IsLoading/IsLoading";
import { NavLink } from "react-router-dom";
import { Todolist } from "./Todolists";

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
  const { todolists, isLoading } = useSelector((state: StoreType) => state);
  const [currentTodo, setCurrentTodo] = useState("");
  const [initialized, setInitialized] = useState(false);

  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();


  //получение тудулистов
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "LOADING" });
        await dispatch(fetchTodoListsThunk());
        dispatch({ type: "LOADED" });
         setInitialized(true);
      } catch (error) {
        alert('no todo');
        console.log('err'+ error)
        // Обработка ошибок при загрузке данных
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (todolists && todolists.length > 0 && initialized) {
      setCurrentTodo(todolists[0].todoid);
    }
  }, [initialized]);



  //добавление листа


  const currentTodolist = todolists.find(
  (item: any) => item.todoid === currentTodo
);

  const changeTodo = async (todoid: string) => {
    try {
      dispatch({ type: "LOADING" });
      await dispatch(fetchTodoListsThunk());
      dispatch({ type: "LOADED" });
      setCurrentTodo(todoid);
    } catch (error) {
      alert("no todo");
      console.log("err" + error);
    }
  }

  return (
    <Wrapper>
      {isLoading.isLoading ? (
        <Isloading />
      ) : (
        <>
          <h4>
            this component works with the node js server on AWS Linux. Database
            is MongoDB
          </h4>

          <div className='workWindow'>
            <Todolist changeTodo={changeTodo} setCurrentTodo={setCurrentTodo} />
            {currentTodolist ? (
              <Tasks currentTodolist={currentTodolist} />
            ) : (
              <div>No todolist yet</div>
            )}
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  .workWindow {
    width: 100%;

    display: flex;
    flex-direction: row;
  }
`;




