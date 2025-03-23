import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import GenericTable, { TableColumn } from "./common/GenericTable";
import ErrorBoundary from "./common/ErrorBoundary";

export const ProcessesTable: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: "fetchProcesses" });
  }, [dispatch]);

  const columns: TableColumn<{ pid: string; command: string }>[] = [
    { key: "pid", label: "PID" },
    { key: "command", label: "Command" },
  ];

  return (
    <ErrorBoundary>
      <GenericTable
        columns={columns}
        caption="Processes"
        data={state.processes}
      />
    </ErrorBoundary>
  );
};
