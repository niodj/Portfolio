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
  isLoading: true, 
};


const saveStateToLocalStorage = (state:any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    alert('error save to local storage')
  }
};


const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return initialState; 
    }
    return JSON.parse(serializedState);
  } catch (error) {
    alert("error read from local storage");
    return initialState; 
  }
};


export const rootReducer = combineReducers({
  counter: counterReducer,
  todolists: todoReducer,
  isLoading: isLoadingReducer,
});


export const store = createStore(rootReducer, loadStateFromLocalStorage());


store.subscribe(() => {
  const state = store.getState();
  saveStateToLocalStorage(state);
});

export type StoreType = ReturnType<typeof rootReducer>;

