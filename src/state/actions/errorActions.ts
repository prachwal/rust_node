import { ErrorObject } from "../types";

export type ErrorAction = 
  | { type: "SET_ERROR"; payload: ErrorObject }
  | { type: "CLEAR_ERROR" };
