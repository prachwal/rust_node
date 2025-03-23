import React, { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import GenericTable, { TableColumn } from "./common/GenericTable";
import ErrorBoundary from "./common/ErrorBoundary";

export const ListeningPortsTable: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: "fetchListeningPorts" });
  }, [dispatch]);

  const columns: TableColumn<{ protocol: string; localAddress: string; state: string }>[] = [
    { key: "protocol", label: "Protocol" },
    { key: "localAddress", label: "Local Address" },
    { key: "state", label: "State" },
  ];

  return (
    <ErrorBoundary>
      <GenericTable
        columns={columns}
        caption="Listening Ports"
        data={state.listeningPorts}
      />
    </ErrorBoundary>
  );
};
