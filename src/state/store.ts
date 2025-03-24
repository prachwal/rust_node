import { useReducer } from "react";
import { appReducer, initialState } from "./reducer";
import { applyMiddleware, middlewares } from "./middleware";

type Listener = () => void;

export const useStore = () => {
  const [state, rawDispatch] = useReducer(appReducer, initialState);

  const getState = () => state;

  // Lista subskrybentów
  const listeners: Listener[] = [];

  // Funkcja do subskrybowania zmian
  const subscribe = (listener: Listener) => {
    listeners.push(listener);
    // Zwracamy funkcję do anulowania subskrypcji
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  };

  // Funkcja do powiadamiania subskrybentów
  const notifyListeners = () => {
    listeners.forEach((listener) => listener());
  };

  // Wzbogacony dispatch, który powiadamia subskrybentów
  const enhancedDispatch = applyMiddleware(middlewares, (action) => {
    rawDispatch(action);
    notifyListeners(); // Powiadom subskrybentów po każdej akcji
  }, getState);

  return { state, dispatch: enhancedDispatch, subscribe };
};


