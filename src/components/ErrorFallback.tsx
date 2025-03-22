import React, { FC } from 'react';

interface ErrorFallbackProps {
  error: Error;
}

const ErrorFallback: FC<ErrorFallbackProps> = ({ error }) => (
  <div className="error-fallback">
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
  </div>
);

export default ErrorFallback;
