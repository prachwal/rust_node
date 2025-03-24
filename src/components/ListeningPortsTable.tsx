import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import GenericTable, { TableColumn } from "./common/GenericTable";
import ErrorBoundary from "./common/ErrorBoundary";

export const ListeningPortsTable: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: "FETCH_ListeningPorts_REQUEST" });
  }, [dispatch]);

  const columns: TableColumn<{ protocol: string; localAddress: string; state: string }>[] = [
    { key: "protocol", label: "Protocol" },
    { key: "localAddress", label: "Local Address" },
    { key: "state", label: "State" },
  ];

  // Check for listening ports payload
  const portsData = state.listeningPorts?.payload || [];

  return (
    <ErrorBoundary>
      <GenericTable
        columns={columns}
        caption="Listening Ports"
        data={portsData}
        tableClassName="listening-ports-table" 
      />
      {state.listeningPorts?.errorState?.message && (
        <div className="error-message">
          <strong>Error:</strong> {state.listeningPorts.errorState.message}
        </div>
      )}
    </ErrorBoundary>
  );
};
