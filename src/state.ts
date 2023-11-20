import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { counterReducer } from "./Counter/counterReducer";
import { todoActions, todoReducer } from "./Todolist/todoReducer";
import {
  LoadingAction,
  isLoadingReducer,
} from "./tools/IsLoading/isLoadingReducer";
import { UserAction, UserReducer } from "./tools/Login/loginReducer";
import {
  isDarkAction,
  isDarkReducer,
} from "./tools/isDarkReducer/isDarkReducer";
import { ScrollAction, scrollReducer } from "./tools/scrollReducer/scrollReducer";

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
  isLoading: false,
  dark: false,
  scroll: 0,
};

export type UserState = {
  email: string;
  password: string;
  loggedIn: boolean;
  userEmail: string;
};

export type CounterStateType = {
  count: any;
  min: any;
  max: any;
  buttonStatus: boolean;
  counterState: boolean;
};

export type TodoState = [];

export type IsLoadingState = {
  isLoading: boolean;
};
export type isDarkState = {
  dark: boolean;
};

export type ScrollState ={
        scroll:number
}

export type RootAction =
  | todoActions
  | LoadingAction
  | UserAction
  | isDarkAction
  | ScrollAction

export const rootReducer = combineReducers({
  counter: counterReducer,
  todolists: todoReducer,
  isLoading: isLoadingReducer,
  user: UserReducer,
  dark: isDarkReducer,
  scroll: scrollReducer,
});

export type StoreType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type thunkType = ThunkDispatch<StoreType, any, RootAction>;
