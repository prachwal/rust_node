import React, { FC } from 'react';
import '../styles/styles.scss';
import ListeningPortsTable from './ListeningPortsTable';
import ErrorBoundary from './ErrorBoundary';

const App: FC = () => (
  <div className='app'>
    <h1>Hello, Webpack with TypeScript!</h1>
    <ErrorBoundary>
      <ListeningPortsTable />
    </ErrorBoundary>
  </div>
);

export default App;