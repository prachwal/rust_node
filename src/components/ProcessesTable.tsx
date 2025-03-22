import { FC, useState, useEffect } from "react";
import GenericTable from "./GenericTable";
import { TableColumn } from "./TableColumn";
import React from "react";
import { useProcessContext } from "../context/ProcessContext";

const columns: TableColumn<{ pid: string; command: string }>[] = [
  { key: "pid", label: "PID", className: "bold-column" }, // Custom style for the column
  { key: "command", label: "Command", className: "green-text" },
];

const ProcessesTable: FC = () => {
  const { selectProcess } = useProcessContext();
  const [data, setData] = useState<{ pid: string; command: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/processes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((json) => setData(json.processes || []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    throw new Error(error);
  }

  return (
    <GenericTable<{ pid: string; command: string }>
      columns={columns}
      caption="Processes Table"
      data={data}
      onRowClick={(row) => selectProcess(row.pid)} // Use context to select process
    />
  );
};

export default ProcessesTable;
