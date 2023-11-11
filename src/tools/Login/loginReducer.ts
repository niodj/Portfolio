import { initialState } from "../../store";

export const UserReducer = (state: any = initialState.user, action: any): any => {

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

}