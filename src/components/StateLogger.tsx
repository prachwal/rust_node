import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import { AppContext } from "./AppContext";
import ErrorBoundary from "./common/ErrorBoundary";
import { ErrorObject } from "../state/types";

const StateLoggerContent: React.FC = () => {
  const { state, subscribe } = useContext(AppContext);
  const [log, setLog] = useState<string[]>([]);
  
  // All refs must be declared at the top level
  const lastErrorRef = useRef<string | null>(null);
  const pidRef = useRef<string | null>(null);

  // Add log entry helper to avoid duplicates
  const addLogEntry = useCallback((entry: string) => {
    setLog(prevLog => {
      // Don't add duplicate entries
      if (prevLog.length > 0 && prevLog[prevLog.length - 1] === entry) {
        return prevLog;
      }
      return [...prevLog, entry];
    });
  }, []);

  // Simplified subscriptions to reduce chances of errors
  useEffect(() => {
    // Initial log
    addLogEntry(`Initial state - Count: ${state.count}`);
    
    // Subscribe to count changes only
    const unsubscribeCount = subscribe(
      (state) => state.count,
      () => {
        addLogEntry(`Count changed to: ${state.count}`);
      }
    );
    
    return unsubscribeCount;
  }, [state.count, addLogEntry]);

  // Enhanced error monitoring - more direct approach
  useEffect(() => {
    // Print current error state to console for debugging
    console.log("StateLogger - Process error state:", state.processes?.errorState);
    console.log("StateLogger - Process details error state:", state.processDetails?.errorState);
    console.log("StateLogger - Ports error state:", state.listeningPorts?.errorState);
    
    // Check for any errors in any part of the state
    const checkAndLogError = (errorState: ErrorObject | null | undefined, prefix: string) => {
      if (errorState && errorState.message && errorState.message.trim() !== "") {
        const errorMessage = `${prefix}: ${errorState.message}`;
        addLogEntry(`ERROR: ${errorMessage}`);
      }
    };
    
    // Check all possible error locations
    checkAndLogError(state.processes?.errorState, "Processes");
    checkAndLogError(state.processDetails?.errorState, "Process Details");
    checkAndLogError(state.listeningPorts?.errorState, "Ports");
    
  }, [
    state.processes?.errorState, 
    state.processDetails?.errorState, 
    state.listeningPorts?.errorState, 
    addLogEntry
  ]);

  // Simple PID monitoring
  useEffect(() => {
    if (state.selectedPid && state.selectedPid !== pidRef.current) {
      pidRef.current = state.selectedPid;
      addLogEntry(`Selected PID: ${state.selectedPid}`);
    }
  }, [state.selectedPid, addLogEntry]);

  const clearLog = () => {
    setLog([]);
    lastErrorRef.current = null;
    pidRef.current = null;
  };

  return (
    <div>
      <h3>State Log:</h3>
      <button type="button" onClick={clearLog}>Clear Log</button>
      <ul style={{ maxHeight: "300px", overflowY: "auto", textAlign: "left" }}>
        {log.map((entry, index) => (
          <li key={index} style={{ 
            color: entry.startsWith("ERROR") ? "red" : 
                   entry.includes("Count") ? "blue" : "black",
            fontWeight: entry.startsWith("ERROR") ? "bold" : "normal"
          }}>
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Wrap component in error boundary
const StateLogger: React.FC = () => {
  return (
    <ErrorBoundary>
      <StateLoggerContent />
    </ErrorBoundary>
  );
};

export default StateLogger;