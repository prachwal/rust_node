import { FC, useState, useEffect } from "react";
import GenericTable from "./GenericTable";
import { TableColumn } from "./TableColumn";
import React from "react";

const columns: TableColumn<{ pid: string; command: string }>[] = [
  {
    key: "pid" as "pid",
    label: "PID",
    style: { fontWeight: "bold" }, // Custom style for the column
  },
  {
    key: "command" as "command",
    label: "Command",
    format: (value: string) => <span className="green-text">{value}</span>, // Custom formatting
  },
];

const ProcessesTable: FC = () => {
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
    />
  );
};

export default ProcessesTable;
