import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import GenericTable, { TableColumn } from "./common/GenericTable";
import ErrorBoundary from "./common/ErrorBoundary";

export const ProcessesTable: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: "FETCH_Processes_REQUEST" });
  }, [dispatch]);

  useEffect(() => {
    if (state.selectedPid) {
      dispatch({ type: "FETCH_ProcessDetails_REQUEST", payload: state.selectedPid });
    }
  }, [state.selectedPid, dispatch]);

  const handleRowClick = (row: { pid: string; command: string }) => {
    dispatch({ type: "selectProcess", payload: row.pid });
  };

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
        onRowClick={handleRowClick}
        tableClassName="listening-ports-table"
        rowProps={(row) => ({
          className: row.pid === state.selectedPid ? "active-row" : "",
        })}
      />
      {state.errorState?.message &&  (
        <div className="error-message">
          <strong>Error:</strong> {String(state.errorState.message || state.errorState.Error?.message)}
        </div>
      )}
      {state.processDetails && (
        <div className="process-details">
          <h3>Process Details</h3>
          <p><strong>PID:</strong> {state.processDetails.pid}</p>
          <p><strong>Command:</strong> {state.processDetails.command}</p>
          <p><strong>CPU Usage:</strong> {state.processDetails.cpu}%</p>
          <p><strong>Memory Usage:</strong> {state.processDetails.memory} MB</p>
        </div>
      )}
    </ErrorBoundary>
  );
};
