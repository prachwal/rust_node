import { AppAction } from "../actions";
import { ErrorObject, Process, ListeningPort, ProcessDetails } from "../types";
import { countReducer } from "./countReducer";
import { loadingReducer } from "./loadingReducer";
import { portReducer } from "./portReducer";
import { processDetailsReducer } from "./processDetailsReducer";
import { processReducer } from "./processReducer";

export interface AppState {
  count: number;
  loading: boolean;
  errorState: ErrorObject;
  processes: Process[]; // Add processes state
  listeningPorts: ListeningPort[]; // Add listening ports state
  selectedPid?: string | null; // Add selectedPid to AppState
  processDetails?: ProcessDetails | null; // Add processDetails to AppState
}

export const initialState: AppState = {
  count: 0,
  loading: false,
  processes: [],
  listeningPorts: [],
  selectedPid: null,
  processDetails: null, // Ensure processDetails is initialized to null
  errorState: { message: "", Error: undefined },
};

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


