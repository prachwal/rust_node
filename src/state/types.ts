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

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}