import React, { FC, JSX } from 'react';
import '../styles/styles.scss';
import ListeningPortsTable from './ListeningPortsTable';
import ErrorBoundary from './ErrorBoundary';
import ErrorFallback from './ErrorFallback';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  style?: React.CSSProperties;
  format?: (value: any) => JSX.Element;
}

const columns: TableColumn<{ protocol: string; localAddress: string; state: string }>[] = [
  {
    key: 'protocol' as 'protocol',
    label: 'Protocol',
    style: { fontWeight: 'bold' }, // Custom style for the column
  },
  {
    key: 'localAddress' as 'localAddress',
    label: 'Local Address',
    format: (value: string) => <span className="blue-text">{value}</span>, // Custom formatting
  },
  {
    key: 'state' as 'state',
    label: 'State',
    style: { textAlign: 'center' as const }, // Custom style for the column
  },
];

const processColumns: TableColumn<{ pid: string; command: string }>[] = [
  {
    key: 'pid' as 'pid',
    label: 'PID',
    style: { fontWeight: 'bold' }, // Custom style for the column
  },
  {
    key: 'command' as 'command',
    label: 'Command',
    format: (value: string) => <span className="green-text">{value}</span>, // Custom formatting
  },
];

const App: FC = () => (
  <div className="app">
    <h1>Hello, Webpack with TypeScript!</h1>
    <ErrorBoundary fallback={ErrorFallback}>
      <ListeningPortsTable<{ protocol: string; localAddress: string; state: string }>
        url="/api/listening-ports"
        columns={columns}
        caption="Listening Ports Table"
      />
    </ErrorBoundary>
    <ErrorBoundary>
      <ListeningPortsTable<{ pid: string; command: string }>
        url="/api/processes"
        columns={processColumns}
        caption="Processes Table"
      />
    </ErrorBoundary>
  </div>
);

export default App;