import styled from "styled-components";
import {NavLink, Outlet} from "react-router-dom";
import React from "react";

export const Profile = (props:any) =>{

    return(
        <Wrapper>Profile
            <div className="navlinks">

                {props.users.map((item: any) => (
                    <div key={item.id}>
                        <NavLink to={`/profile/${item.id}`}>{item.name}</NavLink>
                    </div>
                ))}
            </div>
            <div className="out"><Outlet /></div>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    .out {
      border: solid;
    }
`
