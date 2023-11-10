import { combineReducers, createStore } from "redux";
import { counterReducer } from "./Counter/counterReducer";
import { todoReducer } from "./Todolist/todoReducer";
import { isLoadingReducer } from "./tools/IsLoading/isLoadingReducer";
import { stepsReducer } from "./tools/Steps/stepsReducer";
import { UserReducer } from "./tools/Login/loginReducer";

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
  steps: [
    {
      formState: false,
      startButtonState: true,
    },
    {
      name: "step1",
      display: true,
      text: "step1",
    },
    {
      name: "step2",
      display: false,
      text: "step2",
    },
  ],
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  todolists: todoReducer,
  isLoading: isLoadingReducer,
  steps: stepsReducer,
  user: UserReducer,
});

export const store = createStore(rootReducer);

export type StoreType = ReturnType<typeof rootReducer>;
