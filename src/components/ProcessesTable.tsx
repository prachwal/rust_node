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
  const { processes, selectProcess } = useProcessContext();

  const handleRowClick = async (pid: string) => {
    const selectedProcess = await selectProcess(pid); // Fetch process details dynamically
    console.log("Selected Process:", selectedProcess);
  };

  return (
    <GenericTable<{ pid: string; command: string }>
      columns={columns}
      caption="Processes Table"
      data={processes}
      onRowClick={(row) => handleRowClick(row.pid)} // Use context to fetch process details
    />
  );
};

export default ProcessesTable;
