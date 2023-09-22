import styled from "styled-components";
import {Button} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

type PropsType ={
name:string
}

export const Dialog = (props:PropsType) => {
    const navigate = useNavigate()
    const backHandler = () => {
        navigate(-1)}
    return (
        <Wrapper>{props.name}
            <Button onClick={backHandler}>back</Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  margin-left: 20px;
  background: blue;
`
