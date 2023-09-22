import styled from "styled-components";
import {NavLink, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import React from "react";
import {UsersType} from "../prevState";

type PropsType ={
users:UsersType[]
}
export const Dialogs = (props: PropsType) => {


    return (
        <Wrapper>


                <div className="navlinks">
                    Dialogs
                    {props.users.map((item: UsersType) => (
                        <div key={item.id}>
                            <NavLink to={`${item.id}`}>{item.name}</NavLink>
                        </div>
                    ))}
                </div>

                <Outlet />
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;


  .navlinks {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    .dialogsItem {
     border: solid;
    }
  }
`
