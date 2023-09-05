import styled from "styled-components";
import {NavLink, Outlet, Route, Routes} from "react-router-dom";
import React from "react";
import {Dialog} from "./Dialog";

export const Dialogs = (props: any) => {
    return (
        <Wrapper>


                <div className="navlinks">
                    Dialogs
                    {props.users.map((item: any) => (
                        <div key={item.id}>
                            <NavLink to={`/dialogs/${item.id}`}>{item.name}</NavLink>
                        </div>
                    ))}
                </div>

                <Outlet />
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  background: yellow;

  .navlinks {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    .dialogsItem {
     border: solid;
    }
  }
`
