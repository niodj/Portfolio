import { RootAction, ScrollState, initialState } from "../../state"

export type ScrollAction = {
    type: 'CHANGE_SCROLL';
    scroll: number;
}

export const scrollReducer = (state: ScrollState = { scroll: initialState.scroll }, action: RootAction) => {
    switch(action.type) {
    case 'CHANGE_SCROLL' : return { ...state, scroll: action.scroll }
    default: return state
    }

}