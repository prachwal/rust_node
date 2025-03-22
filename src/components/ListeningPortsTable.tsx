import React, { FC, useEffect, useState } from 'react';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  style?: React.CSSProperties;
  format?: (value: any) => React.ReactNode;
}

interface ListeningPortsTableProps<T> {
  url: string;
  columns: TableColumn<T>[];
  caption: string;
}

const ListeningPortsTable = <T,>({ url, columns, caption }: ListeningPortsTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then(json => setData(json.ports || json.processes || []))
      .catch(err => setError(err.message));
  }, [url]);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <table className="listening-ports-table">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key as string} style={column.style}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map(column => (
              <td key={column.key as string} style={column.style}>
                {column.format ? column.format(item[column.key]) : (item[column.key] as unknown as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListeningPortsTable;
