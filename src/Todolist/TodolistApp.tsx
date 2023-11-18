import React, { useEffect, useState } from "react";

import { Todolist } from "./Todolist";
import { InputForm } from "./InputForm";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootAction, StoreType } from "../state";
import { ThunkDispatch } from "redux-thunk/es/types";
import { addTodoListThunk, fetchTodoListsThunk } from "./thunksActions";
import { Isloading } from "../tools/IsLoading/IsLoading";
import { NavLink } from "react-router-dom";

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
  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();
const dark = useSelector((state:StoreType)=>state.dark.dark)
  //получение тудулистов
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "LOADING" });
        await dispatch(fetchTodoListsThunk());

        dispatch({ type: "LOADED" });
      } catch (error) {
        alert('no todo');
        console.log('err'+ error)
        // Обработка ошибок при загрузке данных
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (todolists && todolists.length > 0) {
      setCurrentTodo(todolists[0].todoid);
    } else {
      console.warn("todolists is empty or undefined");
    }
  }, [todolists]);

  //добавление листа
  const addTodolist = (trimmedValue: string) => {
    dispatch({ type: "LOADING" });
    dispatch(addTodoListThunk(trimmedValue))
      .then(() => dispatch(fetchTodoListsThunk()))
      .then(() => dispatch({ type: "LOADED" }));
  };

  const currentTodolist = todolists.find(
  (item: any) => item.todoid === currentTodo
);

  const changeTodo = async (todoid: string) => {
    try {
      dispatch({ type: "LOADING" });
      await dispatch(fetchTodoListsThunk());

      dispatch({ type: "LOADED" });
    } catch (error) {
      alert("no todo");
      console.log("err" + error);
      // Обработка ошибок при загрузке данных
    }
setCurrentTodo(todoid);
  }
  return (
    <Wrapper $dark={dark}>
      {isLoading.isLoading ? (
        <Isloading />
      ) : (
        <>
          <h4>
            this component works with the node js server on AWS Linux. Database
            is MongoDB
          </h4>

          <div className='workWindow'>
            <div className='todolistList'>
              <h4>Todolists</h4>
              {todolists.map((item: any) => (
                <div
                  key={item.todoid}
                  className='todoMenu'
                  onClick={() => changeTodo(item.todoid)}
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="rightSide">
              <div className='inputTodoForm'>
                <InputForm
                  addFromInput={addTodolist}
                  defaultInput={"New list"}
                />
              </div>
              {currentTodolist ? (
                <Todolist currentTodolist={currentTodolist} />
              ) : (
                <div>No todolist yet</div>
              )}
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $dark: boolean }>`
  width: 80%;
  .workWindow {
    display: flex;
    flex-direction: row;
  }
  .rightSide{
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  } .todolistList {
    display: flex;
    flex-direction: column;
  
  }
  .todoMenu {
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
  .inputTodoForm {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    background-color: ${(props: { $dark: boolean }) =>
      props.$dark ? "grey" : ""};
  }
`;




