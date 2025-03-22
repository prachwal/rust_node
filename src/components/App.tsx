import { FC, useState } from 'react';
import '../styles/styles.scss';
import ErrorBoundary from './ErrorBoundary';
import ErrorFallback from './ErrorFallback';
import React from 'react';
import ListeningPortsTableWrapper from './ListeningPortsTableWrapper';
import ProcessesTable from './ProcessesTable';
import ProcessDetailsTable from './ProcessDetailsTable';
import { ProcessProvider } from "../context/ProcessContext";

const App: FC = () => (
  <ProcessProvider>
    <div className="app">
      <h1>Hello, Webpack with TypeScript!</h1>
      <ErrorBoundary fallback={ErrorFallback}>
        <ListeningPortsTableWrapper />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProcessesTable />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProcessDetailsTable />
      </ErrorBoundary>
    </div>
  </ProcessProvider>
);

export default App;