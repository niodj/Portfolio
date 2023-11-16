import { initialState } from "../../state";

export type IsLoadingState = {
  isLoading: boolean;
};

type LoadingAction =
  | { type: "LOADED" }
  | { type: "LOADING" }

export const isLoadingReducer = (state: any = initialState.isLoading, action:LoadingAction) => {

  switch (action.type) {
    case "LOADED":
      return { ...state, isLoading: false };
    case "LOADING":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
