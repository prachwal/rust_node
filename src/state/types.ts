// types.ts
export interface AppState {
  count: number;
  loading: boolean;
  processes: Process[]; // Add processes state
  listeningPorts: ListeningPort[]; // Add listening ports state
}

export type AppAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "incrementAsync"; payload: number }
  | { type: "setLoading"; payload: boolean }
  | { type: "setProcesses"; payload: Process[] } // Add action for processes
  | { type: "setListeningPorts"; payload: ListeningPort[] } // Add action for listening ports
  | { type: "fetchProcesses" } // Add fetchProcesses action
  | { type: "fetchListeningPorts" }; // Add fetchListeningPorts action

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