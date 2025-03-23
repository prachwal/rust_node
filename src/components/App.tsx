import { FC } from "react";
import "../styles/styles.scss";
import React from "react";
import GenericTable, { type TableColumn } from "./common/GenericTable";
import ErrorButton from "./ErrorButton";
import ErrorBoundary from "./common/ErrorBoundary";
import ErrorFallback from "./ErrorFallback";
import { Counter } from "./Counter";

const App: FC = () => {
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
    <div className="app">
      <h1>Hello, Webpack with TypeScript!</h1>
      <Counter />
      <ErrorBoundary fallback={ErrorFallback}>
        <ErrorButton />
      </ErrorBoundary>
      <GenericTable
        columns={tableColumns}
        caption="Example Table"
        data={tableData}
        onRowClick={(row) => alert(`Row clicked: ${JSON.stringify(row)}`)}
        rowsPerPage={3}
      />
    </div>
  );
};

export default App;
