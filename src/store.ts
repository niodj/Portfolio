import {combineReducers, createStore} from "redux";
import {counterReducer} from "./Counter/counterReducer";
import {todoReducer} from "./Todolist/todoReducer";

export const initialState = {
    counter: {
        count: 0,
        min: '',
        max: '',
        buttonStatus: false,
        counterState: true
    },
    todolists: [],
    sqlConnect:{

    }
}


export const rootReducer = combineReducers(
    {
        count: counterReducer,
        todolists: todoReducer,
        //sqlConnectR:sqlConnectReducer
    }
);

export const store = createStore(rootReducer);
export type StoreType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store