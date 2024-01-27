import {  TaskTrackerState, initialState } from "../store";

export type TasktrackerActions = {
  type: "RECIVE-TASKS-TASKTRACKER";
  payload: TaskTrackerState;
};

export const tasktrackerReducer = (

  state: TaskTrackerState = initialState.tasktrackers,
  action: TasktrackerActions
): TaskTrackerState => {

  switch (action.type) {
    case "RECIVE-TASKS-TASKTRACKER":
      return action.payload
    default:
      return state;
  }
};
