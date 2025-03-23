// types.ts
export interface AppState {
  count: number;
  loading: boolean;
  errorState: ErrorObject;
  processes: Process[]; // Add processes state
  listeningPorts: ListeningPort[]; // Add listening ports state
  selectedPid?: string | null; // Add selectedPid to AppState
  processDetails?: ProcessDetails | null; // Add processDetails to AppState
}

export interface ErrorObject { 
  message: string;
  Error?: Error;
}

export type AppAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "incrementAsync"; payload: number }

  | { type: "setLoading"; payload: boolean }

  | { type: "FETCH_Processes_REQUEST" } 
  | { type: "FETCH_Processes_SUCCESS"; payload: Process[]; errorState: ErrorObject} 
  | { type: "FETCH_Processes_FAILURE"; payload: Process[]; errorState: ErrorObject } 

  | { type: "FETCH_ListeningPorts_REQUEST" } 
  | { type: "FETCH_ListeningPorts_SUCCESS"; payload: ListeningPort[]; errorState: ErrorObject } 
  | { type: "FETCH_ListeningPorts_FAILURE"; payload: ListeningPort[]; errorState: ErrorObject } 

  | { type: "selectProcess"; payload: string } 
  | { type: "FETCH_ProcessDetails_REQUEST"; payload: string }
  | { type: "FETCH_ProcessDetails_SUCCESS"; payload: ProcessDetails; errorState: ErrorObject } 
  | { type: "FETCH_ProcessDetails_FAILURE"; payload: ProcessDetails; errorState: ErrorObject}; 

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export interface Process {
  pid: string;
  command: string;
}

export interface ListeningPort {
  protocol: string;
  localAddress: string;
  state: string;
}

export interface ProcessDetails {
  pid: string;
  ppid: string;
  command: string;
  cpu: string;
  memory: string;
  elapsedTime: string;
}