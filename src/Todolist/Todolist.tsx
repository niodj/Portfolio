import  { useState} from 'react';
import {InputForm} from "./InputForm";
import styled from "styled-components";
import {EditableSpan} from "../tools/EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { blue } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from 'axios';
import Cookies from 'js-cookie';
import { v1 } from 'uuid';
import { useDispatch } from 'react-redux';
import { serverPatch } from '../state';
import { ReceiveTodoAction, fetchTodoListsThunk } from "./todoReducer";
import { TaskType } from './TodolistApp';
import { ThunkDispatch } from 'redux-thunk/es/types';






type PropsType = {
  todoid: string;
  name: string;
  filter: string;
  tasks: TaskType[];
};

export const Todolist = (props: PropsType) => {
   const dispatch: ThunkDispatch<[], any, ReceiveTodoAction> = useDispatch();

  const addNewTask = async (trimmedValue: string) => {
    try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const newTodoList = {
          taskid: v1(),
          name: trimmedValue,
          checked: false,
        };

        const response = await axios.post(
          `${serverPatch}/tasks/${props.todoid}`,
          newTodoList,
          config
        );


         dispatch(fetchTodoListsThunk());

      }
    } catch (error) {
      console.error("Ошибка при добавлении тудулиста:", error);
    }
  };

  //удаление таски
  const removeTask = async (taskid: string) => {
    console.log(taskid);
    try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.delete(
          `${serverPatch}/tasks/${props.todoid}/${taskid}`,
          config
        );
        dispatch(fetchTodoListsThunk()); // Обратите внимание на вызов thunk здесь
      }
    } catch (error) {
      console.error("Ошибка при получении списка тудулистов:", error);
    }
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
  const removeListHandler = async () => {
    try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.delete(
          `${serverPatch}/todolists/${props.todoid}`,
          config
        );
         dispatch(fetchTodoListsThunk()); // Обратите внимание на вызов thunk здесь
      }
    } catch (error) {
      console.error("Ошибка при получении списка тудулистов:", error);
    }
  };

  //обновление checked
  const updateChecked = async (taskid: string, checked: boolean) => {
    try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const data = {
          checked: !checked, // Передайте состояние "checked" в объекте "data"
        };
        const response = await axios.put(
          `${serverPatch}/tasks/${props.todoid}/${taskid}`,
          data,
          config
        );
        dispatch(fetchTodoListsThunk()); // Обратите внимание на вызов thunk здесь
      }
    } catch (error) {
      console.error("Ошибка при обновлении состояния задачи:", error);
    }
  };

  //обновление имени task
  const updateTaskName = async (
    idList: string,
    taskid: string,
    newName: string
  ) => {
    try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const data = {
          name: newName,
        };
        const response = await axios.put(
          `${serverPatch}/tasks/${idList}/${taskid}`,
          data,
          config
        );
       dispatch(fetchTodoListsThunk()); // Обратите внимание на вызов thunk здесь
      }
    } catch (error) {
      console.error("Ошибка при обновлении состояния задачи:", error);
    }
  };

  //обновление имени todo
  const updateTodoName = async (idList: string, newName: string) => {
    console.log(idList);
    try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const data = {
          name: newName,
        };
        const response = await axios.put(
          `${serverPatch}/todolists/${idList}`,
          data,
          config
        );
        dispatch(fetchTodoListsThunk()); // Обратите внимание на вызов thunk здесь
      }
    } catch (error) {
      console.error("Ошибка при обновлении состояния задачи:", error);
    }
  };

  return (
    <Wrapper>
      <Title>
        <EditableSpan
          title={props.name}
          onSave={(newName) => updateTodoName(props.todoid, newName)}
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
                updateTaskName(props.todoid, item.taskid, newName)
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