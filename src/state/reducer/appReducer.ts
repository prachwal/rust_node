import { AppState, AppAction } from "../types";
import { countReducer } from "./countReducer";
import { processReducer } from "./processReducer";
import { portReducer } from "./portReducer";
import { loadingReducer } from "./loadingReducer";
import { processDetailsReducer } from "./processDetailsReducer";

export const appReducer = (state: AppState, action: AppAction): AppState => ({
  ...countReducer({ count: state.count }, action),
  ...processReducer(
    { 
      processes: state.processes, 
      selectedPid: state.selectedPid,
      errorState: state.errorState
    },
    action
  ),
  ...processDetailsReducer(
    { 
      processDetails: state.processDetails,
      errorState: state.errorState
    },
    action
  ),  
  ...portReducer({ listeningPorts: state.listeningPorts }, action),
  ...loadingReducer({ loading: state.loading }, action),
});

