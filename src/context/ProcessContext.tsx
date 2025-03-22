import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Process {
  pid: string;
  ppid: string;
  command: string;
  cpu: string;
  memory: string;
  elapsedTime: string;
}

interface ProcessContextType {
  processes: Process[];
  error: string | null;
  selectProcess: (pid: string) => Promise<Process | undefined>; // Update to return a Promise
}

const ProcessContext = createContext<ProcessContextType | undefined>(undefined);

export const ProcessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/processes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((json) => setProcesses(json.processes || []))
      .catch((err) => setError(err.message));
  }, []);

  const selectProcess = async (pid: string): Promise<Process | undefined> => {
    try {
      const response = await fetch(`/api/process/${pid}`);
      if (!response.ok) {
        throw new Error(`Error fetching process details: ${response.statusText}`);
      }
      const process = await response.json();
      return process;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  return (
    <ProcessContext.Provider value={{ processes, error, selectProcess }}>
      {children}
    </ProcessContext.Provider>
  );
};

export const useProcessContext = (): ProcessContextType => {
  const context = useContext(ProcessContext);
  if (!context) {
    throw new Error("useProcessContext must be used within a ProcessProvider");
  }
  return context;
};
