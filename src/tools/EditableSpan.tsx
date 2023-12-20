import Modal from "@mui/material/Modal";
import { Backdrop, Box, Button, TextField } from "@mui/material";

import React, { ChangeEvent, useState, useEffect } from "react";
import { styled } from "styled-components";

type EditableSpanProps = {
  title?: string;
  value?: string;
  onSave?: (newName: string) => void;
  editMode?: boolean;
  onCancel?: () => void;
};

export const EditableSpan: React.FC<EditableSpanProps> = (props) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    if (props.editMode) {
      setEdit(true);
    }
    if (edit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [edit]);

  const activateEditMode = () => {
    setEdit(true);
    setValue(props.value);
  };

  const deactivateEditMode = () => {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      if (value?.trim() && props.onSave) {
        setEdit(false);
        props.onSave(value);
      }
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey && e.code === "Enter") {
      e.preventDefault();
      deactivateEditMode();
    }
  };

  const handleClose = () => {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      setEdit(false);

      props.onCancel && props.onCancel();
    }
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
          <h4>{props.title}</h4>
          <TextField
            multiline
            maxRows={8}
            autoFocus
            value={value}
            onChange={onChangeTitle}
            onKeyDown={onKeyDown}
          />
          <p>ctrl+enter for save</p>
          <Button onClick={deactivateEditMode}>OK</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  ) : (
    <TitleName onClick={activateEditMode}>{props.value}</TitleName>
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
  position: "fixed" as "fixed", // Изменено на fixed
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
