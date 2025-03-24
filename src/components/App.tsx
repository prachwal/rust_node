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
import StateLogger from "./StateLogger";

const App: FC = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="app">
      <h1>State Management with Subscriptions</h1>
      <Counter />
      <button type="button" onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button type="button" onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
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
      <StateLogger />
    </div>
  );
};

export default App;
