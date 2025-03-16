import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hello, Webpack with TypeScript!', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, Webpack with TypeScript!/i);
  expect(linkElement).toBeInTheDocument();
});