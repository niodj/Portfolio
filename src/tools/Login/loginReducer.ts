
import { StoreType, UserState, initialState } from "../../state";
import { todoActions } from "../../Todolist/todoReducer";

export type AddUserEmailAction = {
  type: "ADD_USER_EMAIL";
  email: string;
};

export type AddUserPasswordAction = {
  type: "ADD_USER_PASSWORD";
  password: string;
};

export type AddUserUserEmailAction = {
  type: "ADD_USER_USEREMAIL";
  userEmail: string;
};

export type AddUserSetLoggedInAction = {
  type: "ADD_USER_setLoggedIn";
  loggedIn: boolean;
};
export type RECEIVE_TODO = {
  type: "RECEIVE_TODO";
  loggedIn: boolean;
};
//type ReceiveTodoAction = { type: "RECEIVE-TODO"; payload: [] };



// Combine all action types into a union type
export type UserAction =
  | AddUserEmailAction
  | AddUserPasswordAction
  | AddUserUserEmailAction
  | AddUserSetLoggedInAction
  | todoActions;


export const UserReducer = (  state: UserState = initialState.user,  action: UserAction): UserState => {
  switch (action.type) {
    case "ADD_USER_EMAIL":
      return { ...state, email: action.email };
    case "ADD_USER_PASSWORD":
      return { ...state, password: action.password };
    case "ADD_USER_USEREMAIL":
      return { ...state, userEmail: action.userEmail };
    case "ADD_USER_setLoggedIn":
      return { ...state, loggedIn: action.loggedIn };
    default:
      return state;
  }
};
