import { AppState } from "../reducer";
import { AppAction } from "../actions";
import { Middleware } from ".";
import { Next } from ".";

export const loggerMiddleware: Middleware<AppState, AppAction> =
  (store) => (next: Next<AppAction>) => (action: AppAction) => {
    console.log(
      "Logger Middleware - Action:",
      action,
      "State before:",
      store.getState()
    );
    const result = next(action); // Pass action to the next middleware or reducer
    console.log("Logger Middleware - State after:", store.getState());
    return result;
  };
