import { AppAction } from "../actions";

export interface CountState {
  count: number;
}

export const countReducer = (state: CountState, action: AppAction): CountState => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "reset":
      return { ...state, count: 0 };
    case "incrementAsync":
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};
