import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import {IconButton, TextField} from "@mui/material";
import QueueIcon from '@mui/icons-material/Queue';


type propsType = {
    addFromInput: (title: string) => void
    defaultInput:string

}
export const InputForm =React.memo ((props: propsType) => {
  const [titleInput, setInputTitle] = useState("");
  const [errorInput, setErrorInput] = useState<string>("");
  const trimmedValue = titleInput.trim();
  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.currentTarget.value);
    setErrorInput("");
  };

  const submitHandler = () => {
    if (trimmedValue) {
      props.addFromInput(trimmedValue);
    } else {
      setErrorInput("field is required");
    }
    setInputTitle("");
  };

  const onPressKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey && e.code === "Enter" && trimmedValue) {
      submitHandler();
    }
  };

  return (
    <>
      <Wrapper>
        <TextField
          error={!!errorInput}
          helperText={errorInput && "empty name"}
          label={props.defaultInput}
          variant={"outlined"}
          onChange={inputHandler}
          value={titleInput}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => onPressKey(e)}
        />
        <IconButton onClick={() => submitHandler()} color={"primary"}>
          <QueueIcon />
        </IconButton>
      </Wrapper>
      <div>press ctrl+Enter to add</div>
    </>
  );
})
const Wrapper = styled.div`
    button {
    margin-left: 10px;
    height: 55px;
  }
 input{ background-color: rgba(255, 255, 255, 0.5)}
  
`