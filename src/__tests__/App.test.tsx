import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders App', () => {
  const comp = render(<App />);
  expect(comp).toBeTruthy();
});
