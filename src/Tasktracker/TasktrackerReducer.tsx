import { initialState } from "../store";

type tasktrackerActions={type:'RECIVE-TASKS',payload:any}

export const tasktrackerReducer = (state: any = initialState.tasktracker, action: tasktrackerActions): any => {
return state
}