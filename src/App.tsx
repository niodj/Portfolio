import React, {useReducer, useState} from 'react';
import {Header} from "./components/Header";
import {Navbar} from "./components/Navbar";
import {Sidebar} from "./components/Sidebar";
import styled from "styled-components";
import {Dialogs} from "./components/Dialogs";
import {Route, Routes} from "react-router-dom";
import {Posts} from "./components/Posts";
import {Dialog} from "./components/Dialog";
import {prevState} from "./prevState";
import {Messages} from "./components/Messages";
import {reducer} from "./components/reducer";


function App() {

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
                    <Route path="/*" element={<Sidebar/>}>
                        <Route path="dialogs" element={<Dialogs users={state.users}/>}>
                            {state.users.map((item: any) => (
                                <Route path={`${item.id}`} element={<Dialog name={item.name}/>}></Route>
                            ))}
                        </Route>
                        <Route path="posts" element={<Posts addPost={addPost} posts={state.posts} action={action} />}></Route>
                        <Route path="messages" element={<Messages users={state.messages}/>}></Route>
                    </Route>
                </Routes>
            </div>
        </Wrapper>
    );
}

export default App;

const Wrapper = styled.div`
  .navSideWrapper {
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    margin-top: 5px;
  }
`
