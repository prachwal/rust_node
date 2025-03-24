import React, { createContext, useReducer, ReactNode, useMemo, useCallback, useRef } from "react";
import { AppState, appReducer, initialState } from "../state/reducer";
import { applyMiddleware, middlewares } from "../state/middleware";
import { AppAction } from "../state/actions";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  subscribe: <T>(selector: (state: AppState) => T, callback: () => void) => () => void;
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => undefined,
  subscribe: (() => () => undefined) as any,
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, rawDispatch] = useReducer(appReducer, initialState);
  
  // Use refs for stable identity
  const stateRef = useRef(state);
  stateRef.current = state; // Update ref on each render
  
  const listenersRef = useRef<Array<{
    selector: (state: AppState) => any;
    callback: () => void;
    prevValue: any;
  }>>([]);

  const getState = useCallback((): AppState => stateRef.current, []);

  // Fixed subscription function that properly captures initial values
  const subscribe = useCallback(<T,>(
    selector: (state: AppState) => T,
    callback: () => void
  ) => {
    // Get the initial value immediately from current state
    const initialValue = selector(stateRef.current);
    
    const listener = {
      selector,
      callback,
      prevValue: initialValue,
    };
    
    listenersRef.current.push(listener);
    
    return () => {
      const index = listenersRef.current.indexOf(listener);
      if (index > -1) {
        listenersRef.current.splice(index, 1);
      }
    };
  }, []);

  // Simplified notifyListeners function to reduce complexity and potential issues
  const notifyListeners = useCallback(() => {
    const currentState = stateRef.current;
    
    listenersRef.current.forEach((listener) => {
      try {
        const newValue = listener.selector(currentState);
        const prevValue = listener.prevValue;
        
        // Simple comparison for primitives
        if (typeof newValue !== 'object' || newValue === null) {
          if (newValue !== prevValue) {
            listener.prevValue = newValue;
            listener.callback();
          }
          return;
        }
        
        // Simplified object comparison
        try {
          const newValueStr = JSON.stringify(newValue);
          const prevValueStr = JSON.stringify(prevValue);
          
          if (newValueStr !== prevValueStr) {
            listener.prevValue = JSON.parse(newValueStr);
            listener.callback();
          }
        } catch (err) {
          // If JSON operations fail, just do a reference check
          if (newValue !== prevValue) {
            listener.prevValue = newValue;
            listener.callback();
          }
        }
      } catch (error) {
        console.error("Error in listener notification:", error);
      }
    });
  }, []);

  const enhancedDispatch = useMemo(
    () => applyMiddleware(
      middlewares,
      (action) => {
        rawDispatch(action);
        notifyListeners();
      },
      getState
    ),
    [notifyListeners, getState]
  );

  const contextValue = useMemo(
    () => ({ state, dispatch: enhancedDispatch, subscribe }),
    [state, enhancedDispatch, subscribe]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};