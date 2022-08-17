import React from 'react';
import { getByTestId, render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const linkElement = getByTestId(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
