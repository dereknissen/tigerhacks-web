import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the TigerHacks landing page', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /TigerHacks 2026/i, level: 1 });
  expect(heading).toBeInTheDocument();
});
