import { ErrorObject, Process, ProcessDetails } from "../types";
import { AppAction } from "../actions";

export interface ProcessState {
  processes: Process[];
  selectedPid?: string | null; // Add selectedPid to the state
  errorState: ErrorObject;
}

export const processReducer = (state: ProcessState, action: AppAction): ProcessState => {
  switch (action.type) {
    case "FETCH_Processes_SUCCESS":
      return { ...state, processes: action.payload, errorState: action.errorState };
    case "FETCH_Processes_FAILURE":
      return { ...state, processes: action.payload, errorState: action.errorState };      
    case "selectProcess":
      console.log("Reducer - selectProcess:", action.payload);
      return { ...state, selectedPid: action.payload };
    default:
      return state;
  }
};
