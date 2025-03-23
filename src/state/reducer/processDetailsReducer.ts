import { AppAction, ErrorObject, Process, ProcessDetails } from "../types";

export interface ProcessState {
  processDetails?: ProcessDetails | null; // Add processDetails to the state
  errorState: ErrorObject
}

export const processDetailsReducer = (state: ProcessState, action: AppAction): ProcessState => {
  switch (action.type) {
    case "FETCH_ProcessDetails_SUCCESS":
      return { ...state, processDetails: action.payload, errorState: action.errorState };
    case "FETCH_ProcessDetails_FAILURE":
      return { ...state, processDetails: action.payload, errorState: action.errorState };
    default:
      return state;
  }
};
