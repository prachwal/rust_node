import React, { useState } from "react";
import { FC, useEffect } from "react";
import GenericTable from "./GenericTable";
import { TableColumn } from "./TableColumn";

const columns: TableColumn<{
  protocol: string;
  localAddress: string;
  state: string;
}>[] = [
  {
    key: "protocol" as "protocol",
    label: "Protocol",
    style: { fontWeight: "bold" }, // Custom style for the column
  },
  {
    key: "localAddress" as "localAddress",
    label: "Local Address",
    format: (value: string) => <span className="blue-text">{value}</span>, // Custom formatting
  },
  {
    key: "state" as "state",
    label: "State",
    style: { textAlign: "center" as const }, // Custom style for the column
  },
];

const ListeningPortsTableWrapper: FC = () => {
  const [data, setData] = useState<
    { protocol: string; localAddress: string; state: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/listening-ports")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((json) => setData(json.ports || []))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    throw new Error(error);
  }

  return (
    <GenericTable<{ protocol: string; localAddress: string; state: string }>
      columns={columns}
      caption="Listening Ports Table"
      data={data}
    />
  );
};

export default ListeningPortsTableWrapper;
