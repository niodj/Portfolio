import { HashRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { CounterApp } from "./Counter/CounterApp";
import { TodolistApp } from "./Todolist/TodolistApp";
import { QueueApp } from "./Queue/QueueApp";
import { Rating } from "./tools/Rating";
import React, { useEffect, useState } from "react";
import { SqlConnect } from "./SqlConnect/SqlConnect";
import { UseParamsApp } from "./tools/UseParamsApp";
import useResize from "./tools/useResize";
import { NavMenu } from "./tools/NavMenu";
import { Button } from "@mui/material";
import { CostListApp } from "./Costlist/CostListApp";
import { SocialNetworkApp } from "./SocialNetwork/SocialNetworkApp";
import { Skills } from "./tools/Skills";
import { ModalWindow } from "./tools/ModalWindow";
import { SunMoon } from "./tools/SunMoon";
import { ClockApp } from "./tools/Clock/ClockApp";
import { useDispatch } from "react-redux";
import { JokeComponent } from "./tools/Weather/JokeComponent";
import Login from "./tools/Login/Login";
import { Practice } from "./Practice";
import { useSelector } from "react-redux";
import { StoreType } from "./state";



export const App = React.memo(() => {
  const [width, height] = useResize();
  const isContentOverflowing = height > window.innerHeight;

  const dispatch = useDispatch();

  //////////dark mode
  function isNightTime() {
    const currentHour = new Date().getHours();
    return currentHour >= 19 || currentHour < 6;
  }
  const dark = useSelector((state: StoreType) =>state.dark.dark);
useEffect(() => {
  dispatch({ type: "NIGHT_NOW", dark: isNightTime() });
}, []);
///////////////
  return (
    <Wrapper $dark={dark} $overflowHidden={isContentOverflowing}>
      <Login />
      <SunMoon />
      <div
        className='clockWrapper'
        onClick={() => {
          dispatch({ type: "id" });
        }}
      >
        <ClockApp />
      </div>

      <div className='buttons'>
        <Button
          variant={"outlined"}
          onClick={() => dispatch({ type: "DAY_NOW" })}
        >
          Day
        </Button>
        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={() => dispatch({ type: "NIGHT_NOW" })}
        >
          Night
        </Button>
      </div>

      <Title>
        <div>Anton Potapenko JS/TS React Developer</div>
        <div>Welcome to my pet projects portfolio page</div>
        <div className='bntModalandCv'>
          <a
            href={"https://asfalter.com.ua/CV_Anton_React.pdf"}
            target={"_blank"}
          >
            <Button>Open my CV</Button>
          </a>
          <ModalWindow />
        </div>
      </Title>
      <div className='rattingAndSkils'>
        <Rating />
        <Skills />
      </div>

      <Routes>
        <Route path='/' element={<NavMenu dark={dark} />}>
          <Route index element={<Practice />}></Route>
          <Route path='costlist' element={<CostListApp />} />
          <Route path='counterapp' element={<CounterApp />} />
          <Route path='todolistapp' element={<TodolistApp />} />
          <Route path='queueapp' element={<QueueApp />} />
          <Route path='sqlconnect' element={<SqlConnect />} />
          <Route path='useparamsapp' element={<UseParamsApp />} />
          <Route path='socialnetworkapp/*' element={<SocialNetworkApp />} />
          <Route path='*' element={<div>.</div>} />
        </Route>
      </Routes>
      <JokeComponent />
    </Wrapper>
  );
});

const Wrapper = styled.div<{ $dark: boolean; $overflowHidden: boolean }>`
  color: ${(props: { $dark: boolean }) => (props.$dark ? "white" : "black")};
  display: flex;
  flex-direction: column;
  align-items: center;

  .buttons {
    margin-top: 60px;
    display: flex;
    flex-direction: row;
  }

  .loader1 {
    width: 50px;
    height: 50px;
  }
  .clockWrapper {
    position: absolute;
  }
  .bntModalandCv {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  text-align: center;
  background-image: ${(props: { $dark: boolean }) =>
    props.$dark
      ? `url(https://i.pinimg.com/originals/28/6b/05/286b059cbd36184d2b6795578a1ee620.jpg)`
      : `url(https://i.pinimg.com/originals/55/e1/c0/55e1c0d248a679ad24cc04ea694b78aa.jpg)`};
  background-attachment: fixed;
  transition: background-image 6s ease-in-out;
  overflow: ${(props: { $overflowHidden: boolean }) =>
    props.$overflowHidden ? "hidden" : "visible"};
  min-height: 100vh;
  background-size: cover;

  .rattingAndSkils {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Title = styled.div`
  margin-top: 20px;
  font-weight: bold;
  font-size: large;
  color: blueviolet;
  text-align: center;
`;
function dispatch(arg0: { type: string; isNigth: boolean; }) {
  throw new Error("Function not implemented.");
}

