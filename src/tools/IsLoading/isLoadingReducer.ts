import { IsLoadingState, initialState } from "../../state";

export type LoadingAction = { type: "LOADED" } | { type: "LOADING" };

export const isLoadingReducer = (state: IsLoadingState = { isLoading: initialState.isLoading },
  action: LoadingAction
) => {
  switch (action.type) {
    case "LOADED":
      return { ...state, isLoading: false };
    case "LOADING":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
