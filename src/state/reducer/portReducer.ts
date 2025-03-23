import { AppAction, ErrorObject, ListeningPort } from "../types";

export interface PortState {
  listeningPorts: ListeningPort[];
}

export const portReducer = (state: PortState, action: AppAction): PortState => {
  switch (action.type) {
    case "FETCH_ListeningPorts_SUCCESS":
      return { ...state, listeningPorts: action.payload };
    case "FETCH_ListeningPorts_FAILURE":
      return { ...state, listeningPorts: action.payload };      
    default:
      return state;
  }
};
