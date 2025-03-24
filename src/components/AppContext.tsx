import React, { createContext, useReducer, ReactNode, useMemo, useCallback } from "react";
import { AppState, appReducer, initialState } from "../state/reducer";
import { applyMiddleware, middlewares } from "../state/middleware";
import { AppAction } from "../state/actions";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  subscribe: (listener: () => void) => () => void;
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => undefined,
  subscribe: () => () => undefined,
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, rawDispatch] = useReducer(appReducer, initialState);
  const listeners: (() => void)[] = []; // Przeniesione poza render

  const getState = (): AppState => state;

  const subscribe = useCallback((listener: () => void) => {
    console.log("Subscribing listener");
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
        console.log("Unsubscribing listener");
      }
    };
  }, []); // Stabilna funkcja dzięki useCallback

  const notifyListeners = useCallback(() => {
    console.log("Notifying listeners:", listeners.length);
    listeners.forEach((listener) => listener());
  }, []); // Stabilna funkcja

  const enhancedDispatch = useMemo(
    () =>
      applyMiddleware(
        middlewares,
        (action) => {
          rawDispatch(action);
          notifyListeners();
        },
        getState
      ),
    [notifyListeners] // Zależność tylko od stabilnych funkcji
  );

  const contextValue: AppContextType = { state, dispatch: enhancedDispatch, subscribe };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};