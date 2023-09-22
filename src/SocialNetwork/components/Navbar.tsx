import styled from "styled-components";
import {NavLink} from "react-router-dom";
import React from "react";

export const Navbar = () =>{

    return(
        <Wrapper>
            <div>Navbar</div>
            <div><NavLink to="dialogs">Dialog</NavLink></div>
            <div><NavLink to="posts">Posts</NavLink></div>
            <div><NavLink to="profile">Profile</NavLink></div>
            <div><NavLink to="messages">messages</NavLink></div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  border: solid 1px;
  background-color: green;
  width: 200px;
  padding: 20px;
  a{text-decoration: none;}
`
