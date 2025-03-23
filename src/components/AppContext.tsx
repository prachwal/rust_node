// AppContext.tsx
import React, { createContext, useReducer, ReactNode, useMemo } from "react";
import { AppState } from "../state/reducer";
import { appReducer } from "../state/reducer";
import { initialState } from "../state/reducer";
import { applyMiddleware, middlewares } from "../state/middleware";
import { AppAction } from "../state/actions";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => undefined,
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, rawDispatch] = useReducer(appReducer, initialState);

  const getState = (): AppState => state;

  const enhancedDispatch = useMemo(
    () => applyMiddleware(middlewares, rawDispatch, getState),
    [rawDispatch]
  );

  const contextValue: AppContextType = { state, dispatch: enhancedDispatch };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
