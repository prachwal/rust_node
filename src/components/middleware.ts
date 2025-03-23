// middleware.ts
import { AppAction, AppState, Middleware } from "./types";

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("Logger Middleware - Action:", action, "State before:", store.getState());
  const result = next(action); // Pass action to the next middleware or reducer
  console.log("Logger Middleware - State after:", store.getState());
  return result;
};

const asyncMiddleware: Middleware = (store) => (next) => (action) => {
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

export const middlewares = [loggerMiddleware, asyncMiddleware];

export const applyMiddleware =
  (middlewares: Middleware[], rawDispatch: React.Dispatch<AppAction>, getState: () => AppState) => {
    // Create a store-like object to pass to middleware
    const store = {
      getState,
      dispatch: (action: AppAction) => rawDispatch(action),
    };

    // Compose the middleware chain
    const chain = middlewares.map((middleware) => middleware(store));

    // Enhance the dispatch function by chaining middleware
    const enhancedDispatch = chain.reduceRight(
      (next, middleware) => middleware(next),
      rawDispatch
    );

    return enhancedDispatch;
  };