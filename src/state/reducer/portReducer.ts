import { ErrorObject, ListeningPort } from "../types";
import { AppAction } from "../actions";

export interface PortState {
  listeningPorts: ListeningPort[] | null;
  errorState: ErrorObject | null
}

export const portReducer = (state: PortState, action: AppAction): PortState => {
  switch (action.type) {
    case "FETCH_ListeningPorts_SUCCESS":
      return { ...state, listeningPorts: action.payload, errorState: null };
    case "FETCH_ListeningPorts_FAILURE":
      return { ...state, listeningPorts: null, errorState: action.errorState };      
    default:
      return state;
  }
};
