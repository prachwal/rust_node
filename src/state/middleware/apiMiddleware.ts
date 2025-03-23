import { Middleware, Next } from "./middleware";
import { AppAction, AppState } from "../types";
import { fetchAndDispatch } from "../../api/fetchUtils";

export const apiMiddleware: Middleware<AppState, AppAction> =
  (store) => (next: Next<AppAction>) => async (action: AppAction) => {
    switch (action.type) {
      case "FETCH_Processes_REQUEST":
        await fetchAndDispatch(
          store,
          "/api/processes",
          "FETCH_Processes_SUCCESS",
          "FETCH_Processes_FAILURE",
        );
        break;

      case "FETCH_ListeningPorts_REQUEST":
        await fetchAndDispatch(
          store,
          "/api/listening-ports",
          "FETCH_ListeningPorts_SUCCESS",
          "FETCH_ListeningPorts_FAILURE",
        );
        break;

      case "FETCH_ProcessDetails_REQUEST":
        await fetchAndDispatch(
          store,
          "/api/process/:id",
          "FETCH_ProcessDetails_SUCCESS",
          "FETCH_ProcessDetails_FAILURE",
          {
            pathParams: { id: action.payload },
          }
        );
        break;

      default:
        return next(action);
    }
  };
