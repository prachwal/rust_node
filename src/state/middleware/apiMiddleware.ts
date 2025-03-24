import { Middleware } from ".";
import { Next } from ".";
import { AppState } from "../reducer";
import { AppAction } from "../actions";
import { fetchAndDispatch } from "../../api/fetchUtils";
import { ProcessDetails } from "../types";

export const apiMiddleware: Middleware<AppState, AppAction> =
  (store) => (next: Next<AppAction>) => async (action: AppAction) => {
    try {
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
    } catch (error) {
      // Ensure any uncaught errors are properly handled
      console.error("Error in API middleware:", error);
      store.dispatch({ 
        type: "setLoading", 
        payload: false 
      });
      
      // Use a valid action type from our process actions
      if (error instanceof Error) {
        store.dispatch({
          type: "FETCH_ProcessDetails_FAILURE", 
          payload: {} as ProcessDetails,
          errorState: { 
            message: `API Error: ${error.message}`,
            Error: error 
          }
        });
      }
    }
  };
