import { ErrorObject, Process } from "../types";
import { AppAction } from "../actions";

export interface ProcessState {
  processes: {
    payload: Process[] | null,
    errorState: ErrorObject | null;
  };
  selectedPid?: string | null; 
}

export const processReducer = (state: ProcessState, action: AppAction): ProcessState => {
  switch (action.type) {
    case "FETCH_Processes_SUCCESS":
      return { 
        ...state, 
        processes: {
          payload: action.payload,
          errorState: null
        }
      };
    case "FETCH_Processes_FAILURE":
      return { 
        ...state, 
        processes: {
          payload: null,
          errorState: action.errorState
        }
      };      
    case "selectProcess":
      console.log("Reducer - selectProcess:", action.payload);
      return { ...state, selectedPid: action.payload };
    default:
      return state;
  }
};
