import { getByText } from '@testing-library/react';

test('renders learn react link', () => {
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});