import React from 'react';
import {Header} from "./components/Header";
import {Navbar} from "./components/Navbar";
import {Sidebar} from "./components/Sidebar";
import styled from "styled-components";
import {Dialogs} from "./components/Dialogs";


function App() {
  return (
   <Wrapper>
     <Header />
       <NavSideWrapper>
     <Navbar />
     <Sidebar />
       </NavSideWrapper>
</Wrapper>
  );
}

export default App;

const Wrapper = styled.div`

`
const NavSideWrapper = styled.div`
display: flex;
  flex-direction: row;
  min-height: 100vh;
  margin-top: 5px ;
`

const  SidebarWrapper = styled.div`

`