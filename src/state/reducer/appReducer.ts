import { AppState, AppAction } from "../types";

export const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
      case "increment":
        return { ...state, count: state.count + 1 };
      case "decrement":
        return { ...state, count: state.count - 1 };
      case "reset":
        return { ...state, count: 0 };
      case "setLoading":
        return { ...state, loading: action.payload };
      case "incrementAsync":
        return { ...state, count: state.count + action.payload };
      case "setProcesses":
        return { ...state, processes: action.payload };
      case "setListeningPorts":
        return { ...state, listeningPorts: action.payload };
      default:
        return state;
    }
  };