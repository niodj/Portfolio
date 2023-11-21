import React, { useEffect, useLayoutEffect, useState } from "react";

import { Tasks } from "./Tasks";
import { InputForm } from "./InputForm";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootAction, StoreType } from "../store";
import { ThunkDispatch } from "redux-thunk/es/types";
import { fetchTodoListsThunk } from "./thunksActions";
import { Isloading } from "../tools/IsLoading";
import { NavLink } from "react-router-dom";
import { Todolist } from "./Todolists";
import useResize from "../tools/useResize";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  const state  = useSelector((state: StoreType) => state);
  const [currentTodo, setCurrentTodo] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [width, height] = useResize();
  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();
  const [burgerState, setburgerState] = useState(false);

  //window.scrollY;
  //window.scrollTo(0, scroll);

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
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (state.todolists && state.todolists.length > 0 && initialized) {
      setCurrentTodo(state.todolists[0].todoid);
    }
  }, [initialized]);

  //  смена листа
  const currentTodolist = state.todolists.find(
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
    <Wrapper $dark={state.appProp.dark}>
      {state.appProp.isLoading ? (
        <Isloading />
      ) : (
        <>
          <h4>
            this component works with the node js server on AWS Linux. Database
            is MongoDB
          </h4>
          {width < 400 ? (
            <>
              {burgerState ? (
                <div className='burgerMenu'>
                  <div onClick={closeBurger} className='close'>
                    Close
                    <IconButton>
                      <CloseIcon color='primary'></CloseIcon>
                    </IconButton>
                  </div>
                  <Todolist
                    changeTodo={changeTodo}
                    setCurrentTodo={setCurrentTodo}
                  />
                </div>
              ) : (
                <div className='burger'>
                  <IconButton onClick={openBurger}>
                    <MenuIcon color='primary' />
                  </IconButton>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
          <div className='tasks'>
            {width > 400 ? (
              <Todolist
                changeTodo={changeTodo}
                setCurrentTodo={setCurrentTodo}
              />
            ) : (
              <></>
            )}
            {currentTodolist ? (
              <Tasks
                currentTodolist={currentTodolist}
                setCurrentTodo={setCurrentTodo}
              />
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $dark: boolean }>`
  //position: relative;
  width: 100%;
  .workWindow {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .burger {
    margin-left: 15px;
    display: flex;
    align-items: flex-start;
  }
  .burgerMenu {
    position: fixed;
    top: 0;
    left: 0;
    width: 85%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 20px;
    padding: 20px;
    z-index: 2;
  }
  .tasks {
    display: flex;
  }
  .close {
    margin-bottom: 20px;
  }
`;
