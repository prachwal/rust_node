import { loggerMiddleware } from "./loggerMiddleware";
import { asyncMiddleware } from "./asyncMiddleware";
import { apiMiddleware } from "./apiMiddleware";

// Typ Next (opcjonalny, jeśli chcesz go używać osobno)
export type Next<Action> = (action: Action) => void;

export const middlewares = [loggerMiddleware, asyncMiddleware, apiMiddleware];

// middleware.ts
export const applyMiddleware = <State, Action>(
  middlewares: Middleware<State, Action>[],
  rawDispatch: React.Dispatch<Action>,
  getState: () => State
) => {
  // Create a store-like object to pass to middleware
  const store = {
    getState,
    dispatch: (action: Action) => rawDispatch(action),
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

// Generyczny typ Middleware
export type Middleware<State, Action> = (store: {
  getState: () => State;
  dispatch: React.Dispatch<Action>;
}) => (next: React.Dispatch<Action>) => (action: Action) => void;

