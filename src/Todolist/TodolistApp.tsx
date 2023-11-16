import React, { useEffect } from "react";

import { Todolist } from "./Todolist";
import { InputForm } from "./InputForm";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { StoreType, TodoState, serverPatch } from "../state";

import { ThunkDispatch } from "redux-thunk/es/types";
import {  addTodoListThunk, fetchTodoListsThunk } from "./thunksActions";
import { todoActions } from "./todoReducer";
import { Isloading } from "../tools/IsLoading/IsLoading";


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

  const dispatch: ThunkDispatch<StoreType, any, todoActions> =
    useDispatch();
  const dispatchLoading = useDispatch()

  //получение тудулистов
  useEffect(() => {
    const fetchData = async () => {
      dispatchLoading({ type: "LOADING" });
      await dispatch(fetchTodoListsThunk());
      dispatchLoading({ type: "LOADED" });
    };

    fetchData();
  }, []);

  //добавление листа
  const addTodolist = async (trimmedValue: string) => {
    dispatchLoading({ type: "LOADING" });
    await dispatch(addTodoListThunk(trimmedValue));
    await dispatch(fetchTodoListsThunk());
     dispatchLoading({ type: "LOADED" });
  };
  console.log(isLoading.isLoading);
  return (
    <Wrapper>
      {isLoading.isLoading ? (
        <Isloading />
      ) : (
        <>
          <h4>
            this component works with the node js server on AWS Linux. Database is
            MongoDB
          </h4>
          <InputForm addFromInput={addTodolist} defaultInput={"New list"} />
          <Lists>
            {todolists.map((item: TodoType) => (
              <Todolist
                key={item.todoid}
                todoid={item.todoid}
                name={item.name}
                filter={item.filter}
                tasks={item.tasks}
              />
            ))}
          </Lists>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Lists = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
