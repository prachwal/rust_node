import React, { FC, useEffect, useState } from 'react';

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  style?: React.CSSProperties;
  className?: string; // Optional CSS class for column styling
  format?: (value: any) => React.ReactNode;
}

interface GenericTableProps<T> {
  columns: TableColumn<T>[];
  caption: string;
  data: T[];
  onRowClick?: (row: T) => void; // Optional callback for row click
  rowProps?: (row: T) => React.HTMLAttributes<HTMLTableRowElement>; // Added rowProps definition
  rowsPerPage?: number; // Optional prop to define rows per page
  disablePagination?: boolean; // Optional prop to disable pagination
  tableClassName?: string; // Ensure this property is defined
}

const GenericTable = <T,>({
  columns,
  caption,
  data,
  onRowClick,
  rowProps, // Added rowProps to destructuring
  rowsPerPage = 5,
  disablePagination = false,
  tableClassName = "default-table-class", // Default className if not provided
}: GenericTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const paginatedData = disablePagination
    ? data
    : data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const shouldShowPagination = !disablePagination && data.length > rowsPerPage;

  return (
    <table className={tableClassName}>
      <caption>{caption}</caption>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key as string}
              style={column.style}
              className={column.className} // Apply the CSS class if provided
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((item, index) => (
          <tr
            key={index}
            {...(rowProps ? rowProps(item) : {})} // Apply rowProps if provided
            onClick={() => onRowClick && onRowClick(item)} // Trigger callback on row click
            style={{
              cursor: onRowClick ? "pointer" : "default",
              ...(rowProps ? rowProps(item).style : {}), // Merge styles if rowProps provides them
            }}
          >
            {columns.map((column) => (
              <td
                key={column.key as string}
                style={column.style}
                className={column.className} // Apply the CSS class if provided
              >
                {column.format ? column.format(item[column.key]) : (item[column.key] as unknown as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {shouldShowPagination && (
        <tfoot>
          <tr>
            <td colSpan={columns.length} style={{ textAlign: "center" }}>
              <button
                type="button"
                className="pagination-button"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              <span>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                type="button"
                className="pagination-button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};

export default GenericTable;
