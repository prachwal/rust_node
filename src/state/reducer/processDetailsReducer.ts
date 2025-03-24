import { ErrorObject, ProcessDetails } from "../types";
import { AppAction } from "../actions";

export interface ProcessDetailsState {
  processDetails?: {
    payload: ProcessDetails | null,
    errorState: ErrorObject | null;
  };
}

export const processDetailsReducer = (state: ProcessDetailsState, action: AppAction): ProcessDetailsState => {
  switch (action.type) {
    case "FETCH_ProcessDetails_SUCCESS":
      return { 
        ...state, 
        processDetails: {
          payload: action.payload,
          errorState: null
        }
      };
    case "FETCH_ProcessDetails_FAILURE":
      console.log("ProcessDetailsReducer: Capturing error", action.errorState);
      return { 
        ...state, 
        processDetails: {
          payload: null,
          errorState: action.errorState || { message: "Unknown error occurred" }
        }
      };
    default:
      return state;
  }
};
