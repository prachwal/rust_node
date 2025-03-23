// AppContext.tsx
import React, { createContext, useReducer, ReactNode, useMemo } from "react";
import { AppState, AppAction, AppContextType } from "../state/types";
import { initialState, appReducer } from "../state/reducer";
import { applyMiddleware} from "../state/middleware/middleware";
import { middlewares } from "../state/middleware";

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => undefined,
});

interface AppProviderProps {
  children: ReactNode;
}

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
