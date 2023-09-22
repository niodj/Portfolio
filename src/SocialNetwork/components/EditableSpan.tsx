import React, {ChangeEvent, useState} from "react";
import styled from "styled-components";

type PropsEditType = {
    title:string
}
export const EditableSpan = (props:PropsEditType) => {

    const [edit, setEdit] = useState(false)
    const [title, setTitie] = useState(props.title)

    const activateEditMode = () => {
        setEdit(true)
        setTitie(props.title)
    }

    const deactivateEditMode = () => {
        setEdit(false)
    }

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitie(event.currentTarget.value)
    }

    return edit ? <input value={title}
                             onChange={onChangeTitle}
                             onBlur={deactivateEditMode}
                             autoFocus
        />
        : <span onDoubleClick={activateEditMode}>{title}</span>

}

