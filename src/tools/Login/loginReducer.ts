import { todoActions } from "../../Todolist/todoReducer";
import { UserStateType, initialState } from "../../store";

export type AddUserEmailAction = { type: "ADD_USER_EMAIL"; email: string };
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


export type LoginAction =
  | AddUserEmailAction
  | AddUserPasswordAction
  | AddUserUserEmailAction
  | AddUserSetLoggedInAction
  

export const loginReducer = (state: UserStateType = initialState.user, action: LoginAction) => {

switch(action.type){
    case "ADD_USER_EMAIL":
      return { ...state, email: action.email };
    case "ADD_USER_PASSWORD":
      return { ...state, password: action.password };
    case "ADD_USER_USEREMAIL":
      return { ...state, userEmail: action.userEmail };
    case "ADD_USER_setLoggedIn":
        return { ...state, loggedIn: action.loggedIn };
    default:return state
    }
}
