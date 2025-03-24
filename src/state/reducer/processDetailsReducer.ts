import { ErrorObject, Process, ProcessDetails } from "../types";
import { AppAction } from "../actions";

export interface ProcessState {
  processDetails?: ProcessDetails | null; // Add processDetails to the state
  errorState: ErrorObject | null
}

export const processDetailsReducer = (state: ProcessState, action: AppAction): ProcessState => {
  switch (action.type) {
    case "FETCH_ProcessDetails_SUCCESS":
      return { ...state, processDetails: action.payload, errorState: null };
    case "FETCH_ProcessDetails_FAILURE":
      return { ...state, processDetails: null, errorState: action.errorState };
    default:
      return state;
  }
};
