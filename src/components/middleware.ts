// middleware.ts
import { AppAction, Middleware, AppState } from "./types";

type Next = (action: AppAction) => void;

const loggerMiddleware: Middleware =
  (dispatch, getState) => (action) => {
    console.log("Action:", action, "State before:", getState());
    dispatch(action); // Zastąpione przez next(action) w pełnej wersji
    console.log("State after:", getState());
  };

const asyncMiddleware: Middleware =
  (dispatch, getState) => (action) => {
    if (action.type === "incrementAsync") {
      dispatch({ type: "setLoading", payload: true });
      setTimeout(() => {
        dispatch({ type: "incrementAsync", payload: action.payload });
        dispatch({ type: "setLoading", payload: false });
      }, 1000);
    } else {
      dispatch(action); // Zastąpione przez next(action) w pełnej wersji
    }
  };

export const applyMiddleware =
  (middlewares: Middleware[], dispatch: React.Dispatch<AppAction>, getState: () => AppState) =>
  (action: AppAction) => {
    let index = -1;
    const next = (action: AppAction) => {
      index++;
      if (index < middlewares.length) {
        const middleware = middlewares[index]((action) => next(action), getState); // Przekazujemy next zamiast dispatch
        middleware(action);
      } else {
        dispatch(action);
      }
    };
    next(action);
  };

export const middlewares = [loggerMiddleware, asyncMiddleware];