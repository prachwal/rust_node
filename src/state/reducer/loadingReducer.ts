import { AppAction } from "../actions";

export interface LoadingState {
  loading: boolean;
}

export const loadingReducer = (state: LoadingState, action: AppAction): LoadingState => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
