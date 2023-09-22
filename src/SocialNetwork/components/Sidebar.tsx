import styled from "styled-components";
import {Dialogs} from "./Dialogs";
import React from "react";
import {NavLink, Outlet} from "react-router-dom";

export const Sidebar = () =>{

    return(
        <Wrapper>
Sidebar
            <Outlet />

        </Wrapper>
    )
}

const Wrapper = styled.div`
 

`
