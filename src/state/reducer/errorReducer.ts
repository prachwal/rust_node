import { AppAction } from "../actions";
import { ErrorObject } from "../types";

export interface ErrorState {
  errorState: ErrorObject | null;
}


interface ClearErrorAction {
  type: "CLEAR_ERROR";
}

interface SetErrorAction {
  type: "SET_ERROR";
  payload: ErrorObject;
}

type ErrorAction = SetErrorAction | ClearErrorAction;

export const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, errorState: action.payload };
    case "CLEAR_ERROR":
      return { ...state, errorState: null };
    default:
      return state;
  }
};
