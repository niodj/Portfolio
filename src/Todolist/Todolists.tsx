import { styled } from "styled-components";
import { InputForm } from "./InputForm";
import { useDispatch, useSelector } from "react-redux";
import { RootAction, StoreType } from "../store";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThunkDispatch } from "redux-thunk";
import {
  addTodoListThunk,
  fetchTodoListsThunk,
  removeTodoThunk,
} from "./thunksActions";
import { useState } from "react";
import { EditableSpan } from "../tools/EditableSpan";

export const Todolist = (props: any) => {
  const dark = useSelector((state: StoreType) => state.appProp.dark);
  const todolists = useSelector((state: StoreType) => state.todolists);
  const dispatch: ThunkDispatch<StoreType, any, RootAction> = useDispatch();
  const [modalAddTodo, setModalAddTodo] = useState(false);

  //add Todo
  const addTodolist = (newName: string) => {
    dispatch({ type: "LOADING" });
    dispatch(addTodoListThunk(newName))
      .then(() => dispatch(fetchTodoListsThunk()))
      .then(() => dispatch({ type: "LOADED" }));
  };

  return (
    <Wrapper $dark={dark}>
      {modalAddTodo ? (
        <EditableSpan
          editMode={true}
          onSave={(newName) => addTodolist(newName)}
          onCancel={() => setModalAddTodo(false)}
          title={"Add new list"}
        />
      ) : (
        <>
          <Button
            variant='contained'
            color={"primary"}
            onClick={() => setModalAddTodo(true)}
          >
            Add new
          </Button>

          {todolists.map((item: any) => (
            <div
              className='todoButton'
              key={item.todoid}
              onClick={() => props.changeTodo(item.todoid)}
            >
              {item.name}
              <span> ({item.tasks.length})</span>
            </div>
          ))}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $dark: boolean }>`
  .todoButton {
    border: solid blue 1px;
    margin: 8px;
    padding: 10px;
    border-radius: 20px;
    background-color: rgba(217, 214, 238, 0.6);
    &:hover {
      cursor: pointer;
      background-color: lightblue;
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
