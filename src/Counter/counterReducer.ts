import {initialState} from "../store";
import {ChangeEvent} from "react";


export const counterReducer = (state = initialState.counter, action: any) => {

    switch (action.type) {
        case 'SETMIN':return {...state, min:action.newmin};
        case 'SETMAX':return {...state, max:action.newmax};
        case 'COUNTSTATE':return {...state, counterState:action.countstate};
        case 'SETBUTTON':return {...state, buttonStatus:action.buttonStatus};
        case 'INC':return {...state, count:+state.count+1};
        case 'RESET':return {...state, count:state.min};
        case 'SET':return {...state,  count:state.min, buttonStatus: false,counterState: false};
        case 'SETCOUNT':return {...state,count: action.count}

        default:
            return state;
    }
};