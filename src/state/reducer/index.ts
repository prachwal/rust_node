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
  processes: {
    payload: Process[] | null,
    errorState: ErrorObject | null;
  }; // Add processes state
  listeningPorts: {
    payload: ListeningPort[] | null,
    errorState: ErrorObject | null;
  }; // Add listening ports state
  selectedPid?: string | null; // Add selectedPid to AppState
  processDetails?: {
    payload: ProcessDetails | null,
    errorState: ErrorObject | null;
  }; // Add processDetails to AppState
}

export const initialState: AppState = {
  count: 0,
  loading: false,
  processes: {
    payload: [],
    errorState: null
  },
  listeningPorts: {
    payload: [],
    errorState: null
  },
  selectedPid: null,
  processDetails: {
    payload: null,
    errorState: null
  }
};

export const appReducer = (state: AppState, action: AppAction): AppState => ({
  ...countReducer({ count: state.count }, action),
  ...processReducer(
    {
      processes: state.processes,
      selectedPid: state.selectedPid
    },
    action
  ),
  ...processDetailsReducer(
    {
      processDetails: state.processDetails,
    },
    action
  ),
  ...portReducer({ 
      listeningPorts: state.listeningPorts, 
    }, action),
  ...loadingReducer({ loading: state.loading }, action),
});


