import React, { ChangeEvent, useState, KeyboardEvent } from "react";
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
    if (title.trim() && props.onSave) {
      setEdit(false);
      props.onSave(title);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      deactivateEditMode();
    }
  };

  return edit ? (
    <Wrapper
      autoFocus
      value={title}
      onChange={onChangeTitle}
      onBlur={deactivateEditMode}
      onKeyDown={onKeyDown}
    />
  ) : (
    <span onClick={activateEditMode}>{props.title}</span>
  );
};

const Wrapper = styled.textarea`
  font-weight: bold;
  font-size: 25px;
  background-color: transparent;
  color: rosybrown;
  text-align: center;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.2);
  height: 30px;
  resize: none;
`;
