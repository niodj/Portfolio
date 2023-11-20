import { RootAction, StoreType, initialState, isDarkState } from "../../state";

export type isDarkAction =
  | { type: "DAY_NOW"; dark: boolean }
  | { type: "NIGHT_NOW"; dark: boolean };

export const isDarkReducer = (state: isDarkState = { dark: initialState.dark }, action: RootAction) => {
  switch (action.type) {
    case "DAY_NOW":
      return { ...state, dark: false };
    case "NIGHT_NOW":
      return { ...state, dark: true };
    default:
      return state;
  }
};
