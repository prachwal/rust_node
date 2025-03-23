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

export type Next = (action: AppAction) => void;

export type Middleware = (store: {
  getState: () => AppState;
  dispatch: React.Dispatch<AppAction>;
}) => (next: React.Dispatch<AppAction>) => (action: AppAction) => void;

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}