import { FC } from 'react';
import '../styles/styles.scss';
import ErrorBoundary from './ErrorBoundary';
import ErrorFallback from './ErrorFallback';
import React from 'react';
import ListeningPortsTableWrapper from './ListeningPortsTableWrapper';
import ProcessesTable from './ProcessesTable';

const App: FC = () => (
  <div className="app">
    <h1>Hello, Webpack with TypeScript!</h1>
    <ErrorBoundary fallback={ErrorFallback}>
      <ListeningPortsTableWrapper />
    </ErrorBoundary>
    <ErrorBoundary>
      <ProcessesTable />
    </ErrorBoundary>
  </div>
);

export default App;