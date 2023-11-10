import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";
import styled from "styled-components";
type EditableSpanProps = {
  title: string;
  onSave?: (newName: string) => void;
};

export const EditableSpan: React.FC<EditableSpanProps> = (props) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.title);

  const activateEditMode = () => {
    setEdit(true);
    setTitle(props.title);
  };

  const deactivateEditMode = () => {
    setEdit(false);
    if (props.onSave) {
      props.onSave(title);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return edit ? (
    <Input
      value={title}
      onChange={onChangeTitle}
      onBlur={deactivateEditMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};
const Input = styled(TextField)`
  background-color: rgba(255, 255, 255, 0.2);
`;
