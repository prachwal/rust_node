// types.ts
export interface AppState {
  count: number;
  loading: boolean;
}

export type AppAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "incrementAsync"; payload: number }
  | { type: "setLoading"; payload: boolean };

export type Middleware = (
  dispatch: React.Dispatch<AppAction>,
  getState: () => AppState
) => (action: AppAction) => void;

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}