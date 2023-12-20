
import { RootAction, appPropStateType, initialState } from "../store";

export type LoadingAction = { type: "LOADED" } | { type: "LOADING" };
export type IsDarkAction = { type: "DAY_NOW" } | { type: "NIGHT_NOW" };

export const appPropReducer = (
  state: appPropStateType = initialState.appProp,
  action: RootAction
) => {
  switch (action.type) {
    case "LOADED":
      return { ...state, isLoading: false };
    case "LOADING":
      return { ...state, isLoading: true };
    case "DAY_NOW":
      return { ...state, dark: false };
    case "NIGHT_NOW":
      return { ...state, dark: true };

    default:
      return state;
  }
};
