import { combineReducers, createStore } from "redux";
import { counterReducer } from "./Counter/counterReducer";
import { todoReducer } from "./Todolist/todoReducer";
import { isLoadingReducer } from "./tools/IsLoading/isLoadingReducer";

// Начальное состояние Redux
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
  isLoading: true, // Исправил опечатку в имени поля
};

// Функция для сохранения состояния в localStorage
const saveStateToLocalStorage = (state:any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    // Обработка ошибок при сохранении в localStorage, если необходимо
  }
};

// Функция для загрузки состояния из localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return initialState; // Возвращайте начальное состояние, если нет сохраненного состояния
    }
    return JSON.parse(serializedState);
  } catch (error) {
    // Обработка ошибок при загрузке из localStorage, если необходимо
    return initialState; // Возвращайте начальное состояние в случае ошибки
  }
};

// Комбинированный редьюсер
export const rootReducer = combineReducers({
  counter: counterReducer,
  todolists: todoReducer,
  isLoading: isLoadingReducer,
});

// Создание Redux store с загрузкой состояния из localStorage
export const store = createStore(rootReducer, loadStateFromLocalStorage());

// Подписка на изменения состояния Redux для сохранения в localStorage
store.subscribe(() => {
  const state = store.getState();
  saveStateToLocalStorage(state);
});

// Тип хранилища Redux
export type StoreType = ReturnType<typeof rootReducer>;

