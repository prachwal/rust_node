import React, { FC, useEffect, useState } from 'react';
import { fetchJson } from '../api/apiClient';

interface Port {
  protocol: string;
  localAddress: string;
  state: string;
  [key: string]: any; // Allow additional dynamic fields
}

interface Column {
  key: string; // The key in the data object
  label: string; // The column header label
  format?: (value: any) => React.ReactNode; // Optional formatting function
  style?: React.CSSProperties; // Optional custom styles for the column
}

interface ListeningPortsTableProps {
  url: string; // API endpoint
  columns: Column[]; // Array of column definitions
  caption?: string; // Optional caption for the table
}

const ListeningPortsTable: FC<ListeningPortsTableProps> = ({ url, columns, caption }) => {
  const [ports, setPorts] = useState<Port[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const data = await fetchJson(url);
        setPorts(data.ports);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPorts();
  }, [url]);

  if (error) {
    throw error; // Let ErrorBoundary handle the error
  }

  if (loading) return <div>Loading...</div>;

  return (
    <table className="listening-ports-table">
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className={`column-${column.key}`}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ports.map((port, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key} className={`column-${column.key}`}>
                {column.format ? column.format(port[column.key]) : port[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListeningPortsTable;
