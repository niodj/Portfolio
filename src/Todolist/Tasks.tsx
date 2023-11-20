import  { useState} from 'react';
import {InputForm} from "./InputForm";
import styled from "styled-components";
import {EditableSpan} from "../tools/EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { blue } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from 'react-redux';
import { RootAction, StoreType, serverPatch } from '../state';
import { todoActions } from "./todoReducer";
import { TaskType, TodoType } from './TodolistApp';
import { ThunkDispatch } from 'redux-thunk/es/types';
import { addNewTaskThunk,  removeTaskThunk, removeTodoThunk, updateCheckedThunk, updateTaskNameThunk, updateTodoNameThunk } from './thunksActions';
import { useSelector } from 'react-redux';

type PropsType = {
  currentTodolist: TodoType;
  setCurrentTodo: any;
};

export const Tasks = (props: PropsType) => {
  const dark = useSelector((state: StoreType) => state.dark.dark);
  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();
const todolists = useSelector((state: StoreType) => state.todolists);


  const addNewTask = (trimmedValue: string) => {
    dispatch({ type: "LOADING" });
    dispatch(addNewTaskThunk(props.currentTodolist.todoid, trimmedValue)).then(
      () => {
        dispatch({ type: "LOADED" });
      }
    );
  };

  //удаление таски
const removeTask = async (taskid: string) => {
  const isConfirmed = window.confirm("Are you sure?");
  if (isConfirmed) {
    try {
      dispatch({ type: "LOADING" });
      await dispatch(removeTaskThunk(props.currentTodolist.todoid, taskid));
      dispatch({ type: "LOADED" });
    } catch (error) {
      // Обработка ошибок, если необходимо
      console.error("Error removing task:", error);

    }
  }
};


  //обновление checked
  const updateChecked = (taskid: string, checked: boolean) => {
    dispatch({ type: "LOADING" });
    dispatch(
      updateCheckedThunk(props.currentTodolist.todoid, taskid, checked)
    ).then(() => {
      dispatch({ type: "LOADED" });
    });
  };

  //обновление имени task
  const updateTaskName = (taskid: string, newName: string) => {
    dispatch({ type: "LOADING" });
    dispatch(
      updateTaskNameThunk(props.currentTodolist.todoid, taskid, newName)
    ).then(() => {
      dispatch({ type: "LOADED" });
    });
  };

  //обновление имени todo
  const updateTodoName = async (newName: string) => {
    dispatch({ type: "LOADING" });
    dispatch(updateTodoNameThunk(props.currentTodolist.todoid, newName)).then(
      () => {
        dispatch({ type: "LOADED" });
      }
    );
  };

  //удаление листа
const removeListHandler = (todoid: string) => {
  const isConfirmed = window.confirm("Are you sure?");
  if (isConfirmed) {
    try {
      dispatch({ type: "LOADING" });
      dispatch(removeTodoThunk(todoid)).then(() => {
        if (todolists[0].todoid) {
          props.setCurrentTodo(todolists[0].todoid);
        }
        dispatch({ type: "LOADED" });
      });
    } catch (error) {
      console.error("Error removing task:", error);
    }
  }
};




  let [filter, setFilter] = useState("all");
  let filtered = [...props.currentTodolist.tasks];
  if (filter === "all") {
    filtered = props.currentTodolist.tasks.map((item: TaskType) => item);
  }

  if (filter === "active") {
    filtered = props.currentTodolist.tasks.filter(
      (item: TaskType) => item.checked === false
    );
  }

  if (filter === "completed") {
    filtered = props.currentTodolist.tasks.filter(
      (item: TaskType) => item.checked === true
    );
  }

  function changeFilter(value: string) {
    setFilter(value);
  }

  return (
    <Wrapper $dark={dark}>
      <div className='title'>
        <EditableSpan
          value={props.currentTodolist.name}
          onSave={(newName) => updateTodoName(newName)}
          title={"Edit todo name"}
        />

        <IconButton onClick={() => removeListHandler(props.currentTodolist.todoid)}>
          <DeleteIcon color='primary' />
        </IconButton>
      </div>
      <div className='inputTaskForm'>
        <InputForm addFromInput={addNewTask} defaultInput={"New task"} />
      </div>

      {filtered.map((item: TaskType) => (
        <div className='taskWrapper' key={item.taskid}>
          <LiItem $checked={item.checked}>
            <Checkbox
              sx={{
                color: blue[800],
                "&.Mui-checked": {
                  color: blue[600],
                },
              }}
              checked={item.checked}
              onChange={() => {
                updateChecked(item.taskid, item.checked);
              }}
            />
            <EditableSpan
              value={item.name}
              onSave={(newName) => updateTaskName(item.taskid, newName)}
              title={"edit task name"}
            />

            <IconButton
              onClick={() => {
                removeTask(item.taskid);
              }}
            >
              <DeleteIcon color='primary' />
            </IconButton>
          </LiItem>

          {/* <svg height='1' width='350'>
            <line
              x1='50'
              y1='0'
              x2='300'
              y2='0'
              style={{ stroke: "black", strokeWidth: 1 }}
            />
          </svg> */}
        </div>
      ))}

      <div className='filterButtonGroup'>
        <Button
          variant={filter === "all" ? "contained" : "text"}
          color={"primary"}
          onClick={() => changeFilter("all")}
        >
          {" "}
          all
        </Button>

        <Button
          color={"secondary"}
          variant={filter === "active" ? "contained" : "text"}
          onClick={() => changeFilter("active")}
        >
          active
        </Button>

        <Button
          color={"success"}
          variant={filter === "completed" ? "contained" : "text"}
          onClick={() => changeFilter("completed")}
        >
          completed
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $dark: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%;
  margin: 0px 10px 0px 10px;

  .taskWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: solid 1px;
    margin: 5px 0px 5px 0px;
  }

  .title {
    display: flex;
    flex-direction: row;
    min-width: min-content;
    flex-shrink: 0;
    font-weight: bold;
    font-size: 25px;
    &:hover {
      cursor: pointer;
      background-color: lightblue;
    }
  }

  .filterButtonGroup {
    display: flex;
    justify-content: center;
    margin: 20px;
    background-color: ${(props: { $dark: boolean }) =>
      props.$dark ? "lightblue" : ""};
  }

  .inputTaskForm {
    margin: 20px 0px 20px 0px;
    background-color: ${(props: { $dark: boolean }) =>
      props.$dark ? "grey" : ""};
  }
`;

const LiItem = styled.div<{ $checked: boolean }>`
  display: flex;
  justify-content: space-between;

  ${(props) => props.$checked && "opacity: 0.5;"}
`;


