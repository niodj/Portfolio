import React from 'react';
import {Header} from "./components/Header";
import {Navbar} from "./components/Navbar";
import {Sidebar} from "./components/Sidebar";
import styled from "styled-components";
import {Dialogs} from "./components/Dialogs";
import {NavLink, Route, Routes} from "react-router-dom";
import {Profile} from "./components/Profile";
import {Dialog} from "./components/Dialog";


const users = [{id: 1, name: 'Natasha', age: 35}, {id: 2, name: 'olga', age: 29}]

function App() {
    return (
        <Wrapper>
            <Header/>
            <div className="navSideWrapper">
                <Navbar/>
                <Routes>
                    <Route path="/*" element={<Sidebar/>}>

                        <Route path="dialogs" element={<Dialogs users={users}/>}>
                            {users.map((item: any) => (
                                <Route path={`${item.id}`} element={<Dialog name={item.name} />}></Route>
                            ))}
                        </Route>

                        <Route path="profile" element={<Profile users={users}/>}>
                            {users.map((item: any) => (
                                <Route path={`${item.id}`} element={<div>{item.name}</div>}></Route>
                            ))}
                        </Route>
                        <Route path="profile" element={<Profile/>}></Route>
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
