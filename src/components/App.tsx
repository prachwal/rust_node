import { FC } from "react";
import "../styles/styles.scss";
import ErrorBoundary from "./ErrorBoundary";
import ErrorFallback from "./ErrorFallback";
import React from "react";

const App: FC = () => (
  <ErrorBoundary fallback={ErrorFallback}>
    {" "}
    <div className="app">
      <h1>Hello, Webpack with TypeScript!</h1>
    </div>{" "}
  </ErrorBoundary>
);

export default App;
