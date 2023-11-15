import { initialState } from "../../state";

export type IsLoadingState = {
  isLoading: boolean;
};

type LoadingAction =
  | { type: "ok" }


export const isLoadingReducer = (
  state: IsLoadingState = initialState, 
  action: LoadingAction
): IsLoadingState => {
  if (action.type === "ok") {
    return { ...state, isLoading: false };
  } else {
    return { ...state, isLoading: true };
  }
};
