import { Middleware, Next } from "./middleware";
import { AppAction, AppState } from "../types";

export const apiMiddleware: Middleware<AppState, AppAction> =
  (store) => (next: Next<AppAction>) => async (action: AppAction) => {
    if (action.type === "fetchProcesses") {
      store.dispatch({ type: "setLoading", payload: true });
      try {
        const response = await fetch("/api/processes");
        const data = await response.json();
        store.dispatch({ type: "setProcesses", payload: data.processes });
      } catch (error) {
        console.error("Failed to fetch processes:", error);
      } finally {
        store.dispatch({ type: "setLoading", payload: false });
      }
    } else if (action.type === "fetchListeningPorts") {
      store.dispatch({ type: "setLoading", payload: true });
      try {
        const response = await fetch("/api/listening-ports");
        const data = await response.json();
        store.dispatch({ type: "setListeningPorts", payload: data.ports });
      } catch (error) {
        console.error("Failed to fetch listening ports:", error);
      } finally {
        store.dispatch({ type: "setLoading", payload: false });
      }
    } else {
      return next(action);
    }
  };
