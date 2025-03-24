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

  // Check for processes payload
  const processesData = state.processes?.payload || [];

  return (
    <ErrorBoundary>
      <GenericTable
        columns={columns}
        caption="Processes"
        data={processesData}
        onRowClick={handleRowClick}
        tableClassName="listening-ports-table"
        rowProps={(row) => ({
          className: row.pid === state.selectedPid ? "active-row" : "",
        })}
      />
      {(state.processes?.errorState?.message) && (
        <div className="error-message">
          <strong>Error:</strong> {String(state.processes?.errorState?.message)}
        </div>
      )}
      {state.processDetails?.payload && (
        <div className="process-details">
          <h3>Process Details</h3>
          <p><strong>PID:</strong> {state.processDetails.payload.pid}</p>
          <p><strong>Command:</strong> {state.processDetails.payload.command}</p>
          <p><strong>CPU Usage:</strong> {state.processDetails.payload.cpu}%</p>
          <p><strong>Memory Usage:</strong> {state.processDetails.payload.memory} MB</p>
        </div>
      )}
    </ErrorBoundary>
  );
};
