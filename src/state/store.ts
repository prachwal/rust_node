import { useReducer, useEffect } from "react";
import { appReducer, initialState } from "./reducer";
import { applyMiddleware, middlewares } from "./middleware";

export const useStore = () => {
  const [state, rawDispatch] = useReducer(appReducer, initialState);

  const getState = () => state;

  const enhancedDispatch = applyMiddleware(middlewares, rawDispatch, getState);

  return { state, dispatch: enhancedDispatch };
};