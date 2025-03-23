// AppContext.tsx
import React, { createContext, useReducer, ReactNode, useMemo } from "react";
import { AppState, AppAction, AppContextType } from "./types";
import { initialState, appReducer } from "./reducer";
import { applyMiddleware, middlewares } from "./middleware";

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => undefined,
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Poprawnie typujemy useReducer z dwoma argumentami generycznymi
  const [state, rawDispatch] = useReducer(
    appReducer,
    initialState
  );

  // Poprawny typ dla getState - zwraca AppState, a nie reducer
  const getState = (): AppState => state;

  // Tworzymy dispatch z middleware
  const enhancedDispatch = useMemo(
    () => applyMiddleware(middlewares, rawDispatch, getState),
    [rawDispatch]
  );

  // Poprawny typ contextValue
  const contextValue: AppContextType = { state, dispatch: enhancedDispatch };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};