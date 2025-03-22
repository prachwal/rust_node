import React, { FC } from "react";
import GenericTable from "./GenericTable"; // Import GenericTableProps
import { TableColumn } from "./TableColumn";
import { useProcessContext } from "../context/ProcessContext";

interface ProcessDetails {
  pid: string;
  ppid: string;
  command: string;
  cpu: string;
  memory: string;
  elapsedTime: string;
}

const columns: TableColumn<ProcessDetails>[] = [
  { key: "pid", label: "PID", className: "bold-column" }, // Use the new CSS class
  { key: "ppid", label: "PPID" },
  { key: "command", label: "Command" },
  { key: "cpu", label: "CPU (%)" },
  { key: "memory", label: "Memory (%)" },
  { key: "elapsedTime", label: "Elapsed Time" },
];

const ProcessDetailsTable: FC = () => {
  const { processDetails, error } = useProcessContext();

  if (!processDetails) {
    return null; // Do not render the component if there is no data
  }

  return (
    <div>
      <h2>Process Details</h2>

      {error && <p className="error-message">{error}</p>}

      <GenericTable<ProcessDetails>
        columns={columns}
        caption="Process Details"
        data={[processDetails]}
        disablePagination={true} // Disable pagination for this table
      />
    </div>
  );
};

export default ProcessDetailsTable;
