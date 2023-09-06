import styled from "styled-components";
import {NavLink, Outlet} from "react-router-dom";
import React from "react";

export const Post = (props: any) => {

    console.log(props)
    return (
        <Wrapper>
            {props.message}
            <div>likecount</div>
            <button onClick={() => (props.action({type: 'ADDLIKE', id: props.id}))}>-</button>
            {props.likecount}
            <button onClick={() => (props.action({type: 'UNLIKE', id: props.id}))}>+</button>
            <button onClick={() => (props.action({type: 'DELPOST', id: props.id}))}>del</button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  border: white solid;
  margin: 20px;
`
