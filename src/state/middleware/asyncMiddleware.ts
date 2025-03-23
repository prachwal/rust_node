import { AppState } from "../reducer";
import { AppAction } from "../actions";
import { Middleware } from ".";
import { Next } from ".";

export const asyncMiddleware: Middleware<AppState, AppAction> =
  (store) => (next: Next<AppAction>) => (action: AppAction) => {
    if (action.type === "incrementAsync") {
      store.dispatch({ type: "setLoading", payload: true });
      setTimeout(() => {
        store.dispatch({ type: "incrementAsync", payload: action.payload });
        store.dispatch({ type: "setLoading", payload: false });
      }, 1000);
    } else {
      return next(action); // Pass other actions to the next middleware or reducer
    }
  };
