import styled from "styled-components";
import {Dialogs} from "./Dialogs";
import React from "react";
import {NavLink, Outlet} from "react-router-dom";

export const Sidebar = () =>{

    return(
        <Wrapper>

            <Outlet />

        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 100%;
  border: solid 1px;
  margin-left: 5px;
  background-image: url("https://image.brigitte.de/11730446/t/SI/v3/w1440/r1.5/-/shutterstock-1586723872.jpg");
`
