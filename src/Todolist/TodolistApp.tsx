import React, { useEffect, useState } from "react";

import { Tasks } from "./Tasks";
import { InputForm } from "./InputForm";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootAction, StoreType } from "../state";
import { ThunkDispatch } from "redux-thunk/es/types";
import {  fetchTodoListsThunk } from "./thunksActions";
import { Isloading } from "../tools/IsLoading/IsLoading";
import { NavLink } from "react-router-dom";
import { Todolist } from "./Todolists";
import useResize from "../tools/useResize";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";


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
  const [width, height] = useResize();
  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();
  const [burgerState, setburgerState] = useState(false);
  //получение тудулистов
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "LOADING" });
        await dispatch(fetchTodoListsThunk());
        dispatch({ type: "LOADED" });
        setInitialized(true);
      } catch (error) {
        alert("no todo");
        console.log("err" + error);
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
       setburgerState(false);
    } catch (error) {
      alert("no todo");
      console.log("err" + error);

    }
  };

  const openBurger = () => {
    setburgerState(true);

  };

  const closeBurger = () => {
    setburgerState(false);
  };

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
            {width > 400 ? (
              <Todolist
                changeTodo={changeTodo}
                setCurrentTodo={setCurrentTodo}
              />
            ) : (
              <>
                {burgerState ? (
                  <div className='burgerMenu'>
                    <Todolist
                      changeTodo={changeTodo}
                      setCurrentTodo={setCurrentTodo}
                    />
                    <IconButton onClick={closeBurger}>Close</IconButton>
                  </div>
                ) : (
                  <div className='burger'>
                    <IconButton onClick={openBurger}>
                      <MenuIcon color='primary' />
                    </IconButton>
                  </div>
                )}
              </>
            )}
            {currentTodolist ? (
              <Tasks currentTodolist={currentTodolist} />
            ) : (
              <div></div>
            )}
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  .workWindow {
    width: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
  }
  .burger {
    margin-left: 15px;
  }
  .burgerMenu {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    z-index: 2; /* Чтобы .burgerMenu был выше .burger */
  }
`;