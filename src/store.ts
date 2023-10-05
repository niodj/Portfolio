import { combineReducers, createStore } from "redux";
import { counterReducer } from "./Counter/counterReducer";
import { todoReducer } from "./Todolist/todoReducer";
import { isLoadingReducer } from "./tools/IsLoading/isLoadingReducer";


export const initialState = {
  counter: {
    count: 0,
    min: "",
    max: "",
    buttonStatus: false,
    counterState: true,
  },
  todolists: [],
  sqlConnect: {},
  isLoadind: true
};


export const rootReducer = combineReducers({
  count: counterReducer,
  todolists: todoReducer,
  isLoading: isLoadingReducer
});

export const store = createStore(rootReducer);
export type StoreType = ReturnType<typeof rootReducer>;
// @ts-ignore
window.store = store;
