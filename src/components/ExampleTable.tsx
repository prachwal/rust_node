import React from "react";
import GenericTable, { TableColumn } from "./common/GenericTable";

export const ExampleTable: React.FC = () => {
  const tableData = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
    { id: 4, name: "Diana", age: 40 },
    { id: 5, name: "Eve", age: 45 },
    { id: 6, name: "Frank", age: 50 },
  ];

  const tableColumns: TableColumn<{ id: number; name: string; age: number }>[] =
    [
      { key: "id", label: "ID", className: "bold-column" },
      { key: "name", label: "Name", className: "blue-text" },
      {
        key: "age",
        label: "Age",
        className: "green-text",
        format: (value: number) => `${value} years`,
      },
    ];

  return (
    <GenericTable
      columns={tableColumns}
      caption="Example Table"
      data={tableData}
      onRowClick={(row) => alert(`Row clicked: ${JSON.stringify(row)}`)}
      tableClassName="listening-ports-table" // Pass the className as a prop
      rowsPerPage={3}
    />
  );
};

