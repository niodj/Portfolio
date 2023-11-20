import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch } from "redux";
import {   serverPatch, thunkType } from "../state";
import { todoActions } from "./todoReducer";
import { v1 } from "uuid";
import { useDispatch } from "react-redux";


export const fetchTodoListsThunk = () => {
  return async (dispatch: Dispatch<todoActions>): Promise<void> => {
    try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get(
          `${serverPatch}/todolists/${email}`,
          config
        );
        dispatch({ type: "RECEIVE_TODO", payload: response.data });

      }
    } catch (error) {
      console.error("Ошибка при получении списка тудулистов:", error);
      alert('Error get todolists. Check your internet conection');
    }
  };
};


export const addTodoListThunk = (trimmedValue: string) => {
 return async (dispatch: thunkType) => {
   //добавление листа
   try {
     const token = Cookies.get("token");
     const email = Cookies.get("email");
     if (token && email) {
       const config = {
         headers: {
           Authorization: token,
         },
       };
       const todoid = v1(); // Генерируйте уникальный идентификатор для нового тудулиста
       const newTodoList = {
         email: email,
         todoid: todoid,
         name: trimmedValue,
         filter: "all",
         tasks: [],
       };

       await axios.post(`${serverPatch}/todolists`, newTodoList, config);
     }
     await dispatch(fetchTodoListsThunk());
   } catch (error) {
     console.error("Ошибка при добавлении тудулиста:", error);
     alert("Error add todolists. Check your internet conection");
   }
 };
};

export const addNewTaskThunk = (todoid: string, name: string) => {

  return async (dispatch: thunkType) => {
    try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const newTodoList = {
          taskid: v1(),
          name: name,
          checked: false,
        };

        const response = await axios.post(
          `${serverPatch}/tasks/${todoid}`,
          newTodoList,
          config
        );
          await dispatch(fetchTodoListsThunk());
      }
    } catch (error) {
      console.error("Ошибка при добавлении таски:", error);
      alert("Error add task. Check your internet conection");
    }
  };
}


export const removeTaskThunk = (todoid:string, taskid: string) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
     try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.delete(
          `${serverPatch}/tasks/${todoid}/${taskid}`,
          config
        );
      await dispatch(fetchTodoListsThunk());
      }
    } catch (error) {
       console.error("Ошибка при удалении  таски:", error);
       alert("Error delete task. Check your internet conection");
    }
  };
}

export const removeTodoThunk = (todoid:string) => {
  return async (dispatch: thunkType) => {
    //удаление листа

    try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.delete(
          `${serverPatch}/todolists/${todoid}`,
          config
        );
        dispatch(fetchTodoListsThunk()); // Обратите внимание на вызов thunk здесь
      }
    } catch (error) {
     console.error("Ошибка при удалении  таски:", error);
     alert("Error delete todo. Check your internet conection");
    }
  };
};

export const updateCheckedThunk = (todoid:string, taskid:string, checked:boolean) => {
  return async (dispatch: thunkType) => {
    //обновление checked

      try {
        const token = Cookies.get("token");
        const email = Cookies.get("email");
        if (token && email) {
          const config = {
            headers: {
              Authorization: token,
            },
          };
          const data = {
            checked: !checked,
          };
           await axios.put(
            `${serverPatch}/tasks/${todoid}/${taskid}`,
            data,
            config
          );
          dispatch(fetchTodoListsThunk());
        }
      } catch (error) {
        console.error("Ошибка при обновлении состояния задачи:", error);
           alert("Error update task. Check your internet conection");
      }
    };
};


 //обновление имени task
export const updateTaskNameThunk = (todoid: string, taskid: string, newName: string) => {

  return async (dispatch: thunkType) => {

    try {
      const token = Cookies.get("token");
      const email = Cookies.get("email");
      if (token && email) {
        const config = {
          headers: {
            Authorization: token,
          },
        };
        const data = {
          name: newName,
        };
        const response = await axios.put(
          `${serverPatch}/tasks/${todoid}/${taskid}`,
          data,
          config
        );
        dispatch(fetchTodoListsThunk()); // Обратите внимание на вызов thunk здесь
      }
    } catch (error) {
      console.error("Ошибка при обновлении состояния задачи:", error);
      alert("Error update task. Check your internet conection");
    }
  };
}


//обновление имени todo
  export const updateTodoNameThunk =  (todoid: string, newName: string) => {
    return async (dispatch: thunkType) => {
      try {
        const token = Cookies.get("token");
        const email = Cookies.get("email");
        if (token && email) {
          const config = {
            headers: {
              Authorization: token,
            },
          };
          const data = {
            name: newName,
          };
          const response = await axios.put(
            `${serverPatch}/todolists/${todoid}`,
            data,
            config
          );
          dispatch(fetchTodoListsThunk());
        }
      } catch (error) {
        console.error("Ошибка при обновлении состояния задачи:", error);
        alert("Error update name todo. Check your internet conection");
      }
    };
  }

