import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { counterReducer } from "./Counter/counterReducer";
import { todoActions, todoReducer } from "./Todolist/todoReducer";
import { IsDarkAction, LoadingAction, appPropReducer } from "./tools/appPropReducer";
import { LoginAction, loginReducer } from "./tools/Login/loginReducer";
import { tasktrackerReducer } from "./Tasktracker/TasktrackerReducer";
 export const serverPatch = "https://backend.asfalter.com.ua";
//export const serverPatch = "http://localhost:4444";
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

  tasktracker: {
    tasks: [
      {
        id: 1,
        priority: "low",
        user: "Mika",
        title: "number or short title",
        startDate: "22/12/2023 12:10",
        dueDate: "22/12/2023 00:10",
        description: "Make new feature",
        statusList: ["added", "on work", "returned for reworking", "done"],
        status: [
          {
            statusdate: "22/12/2023 12:10",
            user: "",
            status: "added",
            statusDescription: "need Accountable person",
          },
        ],
      },
    ],
    priorityList: ["low", "middle", "hight"],
    users: [
      {
        id: 1,
        name: "Mika",
        accsesGroup: "admin",
      },
    ],
  },

  todolists: [],
  sqlConnect: {},
  appProp: {
    isLoading: false,
    dark: false,
  },
};

export type UserStateType = {
  email: string;
  password: string;
  loggedIn: boolean;
  userEmail: string;
};
export type TasktrackerType = [
  prioritysList: [string],
  priority: string,
  user: string,
  title: string,
  startDate: string,
  dueDate: string,
  statusList: [string],
  status: {
    user: string;
    status: string;
    description: string;
  }
]

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

export type appPropStateType = {
  isLoading: boolean,
  dark:boolean
}



export type RootAction = todoActions | LoadingAction | LoginAction | IsDarkAction;


export const rootReducer = combineReducers({
  counter: counterReducer,
  todolists: todoReducer,
  appProp: appPropReducer,
  user: loginReducer,
  tasktracker: tasktrackerReducer,
});

export type StoreType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

//если надо что то запускать при изменениии стора
store.subscribe(() => {
  const prevState = store.getState()
});

export type thunkType = ThunkDispatch<StoreType, any, RootAction>;
