import React, {useReducer, useState} from 'react';
import {Header} from "./components/Header";
import {Navbar} from "./components/Navbar";
import {Sidebar} from "./components/Sidebar";
import styled from "styled-components";
import {Dialogs} from "./components/Dialogs";
import {Route, Routes} from "react-router-dom";
import {Posts} from "./components/Posts";
import {Dialog} from "./components/Dialog";
import {prevState, UsersType} from "./prevState";
import {Messages} from "./components/Messages";
import {reducer} from "./components/reducer";


export const SocialNetworkApp = () => {

    const [state, action] = useReducer(reducer, prevState)

    const addPost = (postIntut: string) => {
        action({type: 'ADDPOST', newPost: postIntut});
    }

    return (
        <Wrapper>
            <Header/>
            <div className="navSideWrapper">
                <Navbar/>

                <Routes>
                    <Route index element={<Sidebar/>}/>
                    <Route path="dialogs" element={<Dialogs users={state.users}/>}></Route>
                    {state.users.map((item: UsersType) => (
                        <Route path={`dialogs/${item.id}`} element={<Dialog name={item.name}/>}></Route>
                    ))}
                    <Route path="posts"
                           element={<Posts addPost={addPost} posts={state.posts} action={action}/>}></Route>
                    <Route path="messages" element={<Messages/>}></Route>
                    <Route path="*" element={<div>soc no page</div>}></Route>
                </Routes>
            </div>
        </Wrapper>
    );
}


const Wrapper = styled.div`

  .navSideWrapper {
    display: flex;
    flex-direction: row;
    margin-top: 5px;
  }
`
