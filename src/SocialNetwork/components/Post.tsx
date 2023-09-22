import styled from "styled-components";
import React from "react";
import {EditableSpan} from "./EditableSpan";
import {ADDLIKETYPE, DELPOSTTYPE, UNLIKETYPE} from "./reducer";

type PropsType = {
    post:string
    action:(action:UNLIKETYPE|ADDLIKETYPE|DELPOSTTYPE)=>void
    id:string
    likecount:number
}
export const Post = (props: PropsType) => {
        return (
        <Wrapper>
            <p>double click for correct</p>
            <EditableSpan title={props.post} />
            <div> likecount</div>
    <button onClick={() => (props.action({type: 'UNLIKE', id: props.id}))}>-</button>
    {
        props.likecount
    }
    <button onClick={() => (props.action({type: 'ADDLIKE', id: props.id}))}>+</button>
    <button onClick={() => (props.action({type: 'DELPOST', id: props.id}))}>del</button>
</Wrapper>
)
}

const Wrapper = styled.div`
  border: white solid;
  margin: 20px;
`
