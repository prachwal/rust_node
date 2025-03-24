import { CounterAction } from "./counterActions";
import { LoadingAction } from "./loadingActions";
import { ProcessAction } from "./processActions";
import { PortAction } from "./portActions";

export type AppAction = 
  | CounterAction 
  | LoadingAction 
  | ProcessAction 
  | PortAction;
