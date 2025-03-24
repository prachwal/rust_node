import { useReducer } from "react";
import { appReducer, initialState } from "./reducer";
import { applyMiddleware, middlewares } from "./middleware";

type AppState = typeof initialState;

// Typed listener with selector
interface Listener<T> {
  selector: (state: AppState) => T;
  callback: () => void;
  prevValue: T;
}

export const useStore = () => {
  const [state, rawDispatch] = useReducer(appReducer, initialState);
  
  // Typed listeners array
  const listeners: Listener<any>[] = [];

  const getState = () => state;

  // Subscribe with selector
  const subscribe = <T>(
    selector: (state: AppState) => T,
    callback: () => void
  ) => {
    const listener: Listener<T> = {
      selector,
      callback,
      prevValue: selector(state),
    };
    
    listeners.push(listener);
    
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  };

  // Improved notification logic that properly handles primitives and objects
  const notifyListeners = () => {
    listeners.forEach((listener) => {
      const newValue = listener.selector(state);
      
      // For primitives and null
      if (typeof newValue !== 'object' || newValue === null) {
        if (newValue !== listener.prevValue) {
          listener.prevValue = newValue;
          listener.callback();
        }
        return;
      }
      
      // For objects, do a deep comparison
      if (JSON.stringify(newValue) !== JSON.stringify(listener.prevValue)) {
        // Deep copy to avoid reference issues
        listener.prevValue = JSON.parse(JSON.stringify(newValue));
        listener.callback();
      }
    });
  };

  const enhancedDispatch = applyMiddleware(middlewares, (action) => {
    rawDispatch(action);
    notifyListeners();
  }, getState);

  return { state, dispatch: enhancedDispatch, subscribe };
};


