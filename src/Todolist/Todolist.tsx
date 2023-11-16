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
import { TaskType } from './TodolistApp';
import { ThunkDispatch } from 'redux-thunk/es/types';
import { addNewTaskThunk,  removeTaskThunk, removeTodoThunk, updateCheckedThunk, updateTaskNameThunk, updateTodoNameThunk } from './thunksActions';

type PropsType = {
  todoid: string;
  name: string;
  filter: string;
  tasks: TaskType[];
};

export const Todolist = (props: PropsType) => {

  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();

  const addNewTask =  (trimmedValue: string) => {
    dispatch({ type: "LOADING" });
    dispatch(addNewTaskThunk(props.todoid, trimmedValue)).then(()=>{dispatch({ type: "LOADED" });});
    ;
  };

  //удаление таски
  const removeTask =  (taskid: string) => {
    dispatch({ type: "LOADING" });
     dispatch(removeTaskThunk(props.todoid, taskid)).then(() => {
      dispatch({ type: "LOADED" });
    });
  };

  let [filter, setFilter] = useState("all");
  let filtered = [...props.tasks];
  if (filter === "all") {
    filtered = props.tasks.map((item: TaskType) => item);
  }

  if (filter === "active") {
    filtered = props.tasks.filter((item: TaskType) => item.checked === false);
  }

  if (filter === "completed") {
    filtered = props.tasks.filter((item: TaskType) => item.checked === true);
  }

  function changeFilter(value: string) {
    setFilter(value);
  }

  //удаление листа
  const removeListHandler =  () => {
     dispatch({ type: "LOADING" });
     dispatch(removeTodoThunk(props.todoid)).then(() => {
       dispatch({ type: "LOADED" });
     });;
  };

  //обновление checked
  const updateChecked =  (taskid: string, checked: boolean) => {
    dispatch({ type: "LOADING" });
    dispatch(updateCheckedThunk(props.todoid, taskid, checked)).then(() => {
      dispatch({ type: "LOADED" });
    });
  };

  //обновление имени task
  const updateTaskName = (taskid: string, newName: string) => {
    dispatch({ type: "LOADING" });
    dispatch(updateTaskNameThunk(props.todoid, taskid, newName)).then(() => {
      dispatch({ type: "LOADED" });
    });;
  };

  //обновление имени todo
  const updateTodoName = async (newName: string) => {
    dispatch({ type: "LOADING" });
    dispatch(updateTodoNameThunk(props.todoid, newName)).then(() => {
      dispatch({ type: "LOADED" });
    });;
  };

  return (
    <Wrapper>
      <Title>
        <EditableSpan
          title={props.name}
          onSave={(newName) => updateTodoName(newName)}
        />
        <IconButton onClick={removeListHandler}>
          <DeleteIcon color='primary' />
        </IconButton>
      </Title>
      <div>
        <InputForm addFromInput={addNewTask} defaultInput={"New task"} />
      </div>
      <ul>
        {filtered.map((item: TaskType) => (
          <LiItem key={item.taskid} $checked={item.checked}>
            <Checkbox
              defaultChecked
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
              title={item.name}
              onSave={(newName) =>
                updateTaskName( item.taskid, newName)
              }
            />
            <IconButton
              onClick={() => {
                removeTask(item.taskid);
              }}
            >
              {" "}
              <DeleteIcon color='primary' />
            </IconButton>
          </LiItem>
        ))}
      </ul>

      <FilterButtonGroup>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          color={"primary"}
          onClick={() => changeFilter("all")}
        >
          {" "}
          all
        </Button>

        <Button
          color={"secondary"}
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={() => changeFilter("active")}
        >
          active
        </Button>

        <Button
          color={"success"}
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={() => changeFilter("completed")}
        >
          completed
        </Button>
      </FilterButtonGroup>

      <div>doubble click for edit list name or task name</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 370px;
  max-width: 600px;
  border: solid 1px;

`

const FilterButtonGroup = styled.div`
  display: flex;
  margin-bottom: 20px;

`

const LiItem = styled.div<{ $checked: boolean }>`
  ${(props) => props.$checked && "opacity: 0.5;"}
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
`