import React, {useState} from 'react';
import {InputForm} from "./InputForm";
import styled from "styled-components";
import {EditableSpan} from "../tools/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from '@mui/icons-material';
import {TaskType} from "./TodolistApp";
import {ActionType} from "./todoReducer";


type PropsType = {
    idList: string
    listTitle: string
    filter: string
    tasks: TaskType[]
    action: (action: ActionType) => void
}

export function Todolist(props: PropsType) {

    const removeTask = (idTask: string) => {
        props.action({type: 'REMOVE-TASK', idList: props.idList, idTask: idTask})
    }

    let [filter, setFilter] = useState("all");
    let filtered = [...props.tasks]
    if (filter === "all") {
        filtered = (props.tasks.map((item: TaskType) => item))
    }

    if (filter === "active") {
        filtered = (props.tasks.filter((item: TaskType) => item.isDone === false))
    }

    if (filter === "completed") {
        filtered = (props.tasks.filter((item: TaskType) => item.isDone === true))
    }

    function changeFilter(value: string) {
        setFilter(value);
    }

    const addNewTask = (trimmedValue: string) => {
        props.action({type: 'ADD-TASK', taskTitle: trimmedValue, idList: props.idList})
    }

    return <Wrapper>

        <Title>
            <EditableSpan title={props.listTitle}/>
            <IconButton onClick={() => (props.action({type: 'REMOVE-LIST', idList: props.idList}))}>
                <Delete/></IconButton>
        </Title>
        <div>

            <InputForm addFromInput={addNewTask} defaultInput={'New task'}/>

        </div>
        <ul>
            {filtered.map((item: TaskType) =>
                <LiItem key={item.idTask}
                        $isDone={item.isDone}>
                    <Checkbox checked={item.isDone} onChange={() => (
                        props.action({type: 'CHECKBOX-TOG', idList: props.idList, idTask: item.idTask}))}/>
                    <EditableSpan title={item.taskTitle}/>
                    <IconButton onClick={() => {
                        removeTask(item.idTask)
                    }}> <Delete/>
                    </IconButton>

                </LiItem>)
                //     .sort((a: { title: { toLowerCase: () => number; }; }, b: {
                //     title: { toLowerCase: () => number; };
                // }) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
                //
            }
        </ul>

        <FilterButtonGroup>

            <Button
                variant={props.filter === 'all' ? "contained" : "text"}
                color={"primary"}
                onClick={() => changeFilter('all')}
            > all</Button>

            <Button color={"secondary"}
                    variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={() => changeFilter('active')}
            >active</Button>

            <Button color={"success"}
                    variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={() => changeFilter('completed')}
            >completed</Button>

        </FilterButtonGroup>

        <div>doubble click for edit list name or task name</div>
    </Wrapper>
}

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

const LiItem = styled.div<{ $isDone: boolean }>`
  ${(props) => (props.$isDone && 'opacity: 0.5;')}

`
const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
`