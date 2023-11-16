import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { StoreType, UserState, serverPatch } from "../../state";

import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { UserAction } from "./loginReducer";
import { fetchTodoListsThunk } from "../../Todolist/thunksActions";

const Login: React.FC = () => {
  const email = useSelector((store: StoreType) => store.user.email);
  const password = useSelector((store: StoreType) => store.user.password);
  const loggedIn = useSelector((store: StoreType) => store.user.loggedIn);
  const userEmail = useSelector((store: StoreType) => store.user.userEmail);

  const dispatch: ThunkDispatch<UserState, any, UserAction> = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = Cookies.get("token");
      const emailFromCookie = Cookies.get("email");
      if (token && emailFromCookie) {
        try {
          const response = await axios.post(`${serverPatch}/checkToken`, {
            email: emailFromCookie,
            token: token,
          });
          dispatch({ type: "ADD_USER_setLoggedIn", loggedIn: true });
          dispatch({ type: "ADD_USER_USEREMAIL", userEmail: emailFromCookie });
        } catch (error) {
          console.error("Ошибка при проверке токена:", error);
        }
      }
    };

    checkLoginStatus();
  }, []);
  //////////////////////////////////логинизация///////////////////////////
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${serverPatch}/login`, {
        email: email,
        password: password,
      });

      // Сохранение токена и электронной почты в куках
      Cookies.set("token", response.data.token, { expires: 7 });
      Cookies.set("email", email, { expires: 7 });

      alert("Успешный вход!");
      console.log("Успешный вход!", response.data);
      dispatch({ type: "ADD_USER_setLoggedIn", loggedIn: true });
      dispatch({ type: "ADD_USER_USEREMAIL", userEmail: email });

      //обновление тудулистов при логине
      dispatch(fetchTodoListsThunk()); // Обратите внимание на вызов thunk здесь
    } catch (error) {
      alert(
        "Ошибка входа! Пожалуйста, проверьте правильность введенных данных."
      );
      console.error("Ошибка входа!", error);
    }
  };

  ///////////регистрация/////////////////////
  const handleRegister = async () => {
    if (email.trim().length < 1 || password.trim().length < 1) {
      alert("Пожалуйста, введите от одного символа.");
      return;
    }
    try {
      const response = await axios.post(`${serverPatch}/register`, {
        password: password,
        email: email,
      });
      alert("Успешная регистрация!");
      console.log("Успешная регистрация!", response.data);
      dispatch({ type: "ADD_USER_USEREMAIL", userEmail: email });
      handleLogin();
      //обновление тудулистов при входе
      dispatch(fetchTodoListsThunk()); // Обратите внимание на вызов thunk здесь
    } catch (error) {
      alert("Ошибка регистрации! email занят.");
      console.error("Ошибка регистрации!", error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");

      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      await axios.post(`${serverPatch}/logout`, null, config);
      dispatch({ type: "ADD_USER_setLoggedIn", loggedIn: false });
      dispatch({ type: "ADD_USER_USEREMAIL", userEmail: "" });
      dispatch({ type: "ADD_USER_EMAIL", email: "" });
      dispatch({ type: "ADD_USER_PASSWORD", password: "" });
      // Очистка токена из куков
      Cookies.remove("token");
      //обновление листов при выходе
      dispatch({ type: "RECEIVE_TODO", payload: [] });
    } catch (error) {
      console.error("Ошибка при выходе пользователя", error);
    }
  };
  if (loggedIn) {
    return (
      <Logout>
        <div>Hello, {userEmail}</div>
        <button onClick={handleLogout}>Exit</button>
      </Logout>
    );
  }

  return (
    <Wrapper>
      <Backdrop />
      <Modal>
        <h2>Welcom</h2>
        <p>
          Registration is simplified as much as possible. Please enter
          something, at least 1 1. It is necessary to save your token in cookies
          for your personal data in the application, such as the todolist.
        </p>
        <input
          type='text'
          placeholder='login / email'
          value={email}
          onChange={(e) =>
            dispatch({ type: "ADD_USER_EMAIL", email: e.target.value })
          }
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) =>
            dispatch({ type: "ADD_USER_PASSWORD", password: e.target.value })
          }
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
        {/* <button onClick={()=>{dispatch({ type: "ADD_USER_setLoggedIn", loggedIn: true });}}>Close</button> */}
      </Modal>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div``;
const Logout = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
`;
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  color: black;
  padding: 20px;
  border-radius: 5px;
  z-index: 2;
`;
