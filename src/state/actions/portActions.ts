import { ListeningPort, ErrorObject } from "../types";

export type PortAction =
  | { type: "FETCH_ListeningPorts_REQUEST" }
  | { type: "FETCH_ListeningPorts_SUCCESS"; payload: ListeningPort[]; errorState: ErrorObject }
  | { type: "FETCH_ListeningPorts_FAILURE"; payload: ListeningPort[]; errorState: ErrorObject };
