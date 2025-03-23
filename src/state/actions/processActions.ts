import { Process, ErrorObject, ProcessDetails } from "../types";

export type ProcessAction =
  | { type: "FETCH_Processes_REQUEST" }
  | { type: "FETCH_Processes_SUCCESS"; payload: Process[]; errorState: ErrorObject }
  | { type: "FETCH_Processes_FAILURE"; payload: Process[]; errorState: ErrorObject }
  | { type: "selectProcess"; payload: string }
  | { type: "FETCH_ProcessDetails_REQUEST"; payload: string }
  | { type: "FETCH_ProcessDetails_SUCCESS"; payload: ProcessDetails; errorState: ErrorObject }
  | { type: "FETCH_ProcessDetails_FAILURE"; payload: ProcessDetails; errorState: ErrorObject };
