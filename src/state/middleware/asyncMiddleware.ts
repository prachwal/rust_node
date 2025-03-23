import { Middleware } from "../types";

export const asyncMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === "incrementAsync") {
    console.log("Async Middleware - Starting async operation");
    store.dispatch({ type: "setLoading", payload: true });
    setTimeout(() => {
      store.dispatch({ type: "incrementAsync", payload: action.payload });
      store.dispatch({ type: "setLoading", payload: false });
      console.log("Async Middleware - Completed async operation");
    }, 1000);
  } else {
    return next(action); // Pass other actions to the next middleware or reducer
  }
};
