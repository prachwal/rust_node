import React, { FC } from 'react';
import '../styles/styles.scss';
import ListeningPortsTable from './ListeningPortsTable';
import ErrorBoundary from './ErrorBoundary';
import ErrorFallback from './ErrorFallback';

const columns = [
  {
    key: 'protocol',
    label: 'Protocol',
    style: { fontWeight: 'bold' }, // Custom style for the column
  },
  {
    key: 'localAddress',
    label: 'Local Address',
    format: (value: string) => <span className="blue-text">{value}</span>, // Custom formatting
  },
  {
    key: 'state',
    label: 'State',
    style: { textAlign: 'center' as const }, // Custom style for the column
  },
];

const App: FC = () => (
  <div className="app">
    <h1>Hello, Webpack with TypeScript!</h1>
    <ErrorBoundary fallback={ErrorFallback}>
      <ListeningPortsTable url="/api/listening-ports" columns={columns} caption="Listening Ports Table" />
    </ErrorBoundary>
    <ErrorBoundary>
      <ListeningPortsTable url="/api/listening-ports" columns={columns} caption="Duplicate Listening Ports Table" />
    </ErrorBoundary>    
  </div>
);

export default App;