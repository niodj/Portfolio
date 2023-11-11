import { combineReducers, createStore } from "redux";
import { counterReducer } from "./Counter/counterReducer";
import { todoReducer } from "./Todolist/todoReducer";
import { isLoadingReducer } from "./tools/IsLoading/isLoadingReducer";

import { UserReducer } from "./tools/Login/loginReducer";
//адрес без / в конце
export const serverPatch = "https://backend.asfalter.com.ua";

export const initialState = {
  user: {
    email: "",
    password: "",
    loggedIn: false,
    userEmail: "",
  },

  counter: {
    count: 0,
    min: "",
    max: "",
    buttonStatus: false,
    counterState: true,
  },
  todolists: [],
  sqlConnect: {},
  isLoading: true,
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  todolists: todoReducer,
  isLoading: isLoadingReducer,
  user: UserReducer,
});

export const store = createStore(rootReducer);

export type StoreType = ReturnType<typeof rootReducer>;
