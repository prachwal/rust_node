import React, { createContext, useContext, useState, FC } from "react";

interface ProcessDetails {
  pid: string;
  ppid: string;
  command: string;
  cpu: string;
  memory: string;
  elapsedTime: string;
}

interface ProcessContextType {
  selectedPid: string | null;
  processDetails: ProcessDetails | null;
  error: string | null;
  selectProcess: (pid: string) => void;
}

const ProcessContext = createContext<ProcessContextType | undefined>(undefined);

export const ProcessProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedPid, setSelectedPid] = useState<string | null>(null);
  const [processDetails, setProcessDetails] = useState<ProcessDetails | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const selectProcess = (pid: string) => {
    setSelectedPid(pid);
    fetch(`/api/process/${pid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Process not found or an error occurred.");
        }
        return response.json();
      })
      .then((json) => {
        setProcessDetails(json.process);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setProcessDetails(null);
      });
  };

  return (
    <ProcessContext.Provider
      value={{ selectedPid, processDetails, error, selectProcess }}
    >
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
