import React from "react";
import styled from "styled-components";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

export const NavMenu = React.memo((props: { dark: boolean }) => {
    const navigate = useNavigate()
    const backHandler = () => {
        navigate(-1)
    }

    return (<>
    <Projects $dark={props.dark}>
        <Button><StyledNavLink to="/sqlconnect">SqlConnect (PHP+SQL)</StyledNavLink></Button>
        <Button><StyledNavLink to="/todolistapp">Todolists (AWS Linux + node.js+mongoDB)</StyledNavLink></Button>
        <Button><StyledNavLink to="/queueapp">electronic queue</StyledNavLink></Button>
        <Button><StyledNavLink to="/counterapp">CounterApp</StyledNavLink></Button>
        <Button><StyledNavLink to="/chat">Websockets Chat</StyledNavLink></Button>
        <Button><StyledNavLink to="/costlist">Cost List</StyledNavLink></Button>
    </Projects>
    <Outlet/>
    <Button onClick={backHandler}>back</Button>

</>
)
}
)
const Projects = styled.div<{ $dark: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: center;

  .dropdown-content {
    display: none;
    position: absolute;
    background: ${(props: { $dark: boolean }) => (props.$dark ? "black" : "white")};
    color: ${(props: { $dark: boolean }) => (props.$dark ? "green" : "black")};
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 2;
    border-radius: 20px;
  }

  .dropdown-content p {
    text-decoration: none;
    display: block;
  }

  .dropdown-content p:hover {
    background-color: #ddd;
  }


  :hover .dropdown-content {
    display: block;
  }
`

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  padding: 1rem;
  border: lightgreen solid;
  margin: 10px;
  color: darkviolet;
  background: rgba(255, 255, 255, 0.6);


  &:hover {
    background-color: lightgreen;
  }

  &.active {
    background-color: lightgreen;
    border-radius: 20px;
  }

  &.active:hover {
    border-radius: 20px;
  }

`