import Modal from "@mui/material/Modal";
import { Backdrop, Box, Button, TextField } from "@mui/material";

import React, { ChangeEvent, useState, useEffect } from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { StoreType } from "../state";

type EditableSpanProps = {
  title: string;
  onSave?: (newName: string) => void;
};

export const EditableSpan: React.FC<EditableSpanProps> = (props) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.title);

  useEffect(() => {
    if (edit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [edit]);

  const activateEditMode = () => {
    setEdit(true);
    setTitle(props.title);
  };

  const deactivateEditMode = () => {
    if (title.trim() && props.onSave) {
      setEdit(false);
      props.onSave(title);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey && e.code === "Enter") {
      e.preventDefault();
      deactivateEditMode();
    }
  };

  const handleClose = () => {
    setEdit(false);
  };

  return edit ? (
    <>
      <Modal
        open={edit}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'

      >
        <Box sx={style}>
          <TextField
            multiline
            maxRows={8}
            autoFocus
            value={title}
            onChange={onChangeTitle}
            //onBlur={deactivateEditMode}
            onKeyDown={onKeyDown}
          />
          <p>ctrl+enter for save</p>
          <Button onClick={deactivateEditMode}>OK</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  ) : (
    <TitleName onClick={activateEditMode}>{props.title}</TitleName>
  );
};

const TitleName = styled.div`
display: flex;
align-items: center;
width: 100%;
`;
const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

