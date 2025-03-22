import React, { FC, useEffect, useState } from 'react';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  style?: React.CSSProperties;
  format?: (value: any) => React.ReactNode;
}

interface GenericTableProps<T> {
  columns: TableColumn<T>[];
  caption: string;
  data: T[]; // Data is passed directly
}

const GenericTable = <T,>({ columns, caption, data }: GenericTableProps<T>) => {
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

export default GenericTable;
