import { ErrorObject, ListeningPort } from "../types";
import { AppAction } from "../actions";

export interface PortState {
  listeningPorts: {
    payload: ListeningPort[] | null,
    errorState: ErrorObject | null;
  };
}

export const portReducer = (state: PortState, action: AppAction): PortState => {
  switch (action.type) {
    case "FETCH_ListeningPorts_SUCCESS":
      return { 
        ...state, 
        listeningPorts: {
          payload: action.payload,
          errorState: null
        }
      };
    case "FETCH_ListeningPorts_FAILURE":
      return { 
        ...state, 
        listeningPorts: {
          payload: null,
          errorState: action.errorState
        }
      };      
    default:
      return state;
  }
};
