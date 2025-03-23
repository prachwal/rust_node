import { FC, useContext } from "react";
import "../styles/styles.scss";
import React from "react";
import ErrorButton from "./ErrorButton";
import ErrorBoundary from "./common/ErrorBoundary";
import ErrorFallback from "./ErrorFallback";
import { Counter } from "./Counter";
import { AppContext } from "./AppContext";
import { ProcessesTable } from "./ProcessesTable";
import { ListeningPortsTable } from "./ListeningPortsTable";
import { ExampleTable } from "./ExampleTable";

const App: FC = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="app">
      <h1>Hello, Webpack with TypeScript!</h1>
      <Counter />
      <ErrorBoundary fallback={ErrorFallback}>
        <ErrorButton />
      </ErrorBoundary>
      <ErrorBoundary fallback={ErrorFallback}>
        <ExampleTable />
      </ErrorBoundary>
      <ErrorBoundary fallback={ErrorFallback}>
        <ListeningPortsTable />
      </ErrorBoundary>
      <ErrorBoundary fallback={ErrorFallback}>
        <ProcessesTable />
      </ErrorBoundary>
      {state.loading && <p>Loading...</p>}
    </div>
  );
};

export default App;
