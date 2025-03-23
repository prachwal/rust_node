// middleware.ts
import { AppAction, AppState, Middleware } from "../types";

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