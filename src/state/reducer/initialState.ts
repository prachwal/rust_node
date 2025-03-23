import { AppState } from "../types";

export const initialState: AppState = {
  count: 0,
  loading: false,
  processes: [],
  listeningPorts: [],
  selectedPid: null,
  processDetails: null, // Ensure processDetails is initialized to null
  errorState: { message: "" },
};
