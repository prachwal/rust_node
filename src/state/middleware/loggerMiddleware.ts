import { Middleware } from "../types";

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("Logger Middleware - Action:", action, "State before:", store.getState());
  const result = next(action); // Pass action to the next middleware or reducer
  console.log("Logger Middleware - State after:", store.getState());
  return result;
};
