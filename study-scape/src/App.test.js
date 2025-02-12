import React from "react";
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders StudyScape heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/StudyScape/i);
  expect(linkElement).toBeInTheDocument();
});
