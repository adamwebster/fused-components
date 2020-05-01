import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Toggle } from './index';

afterEach(cleanup);

describe('Toggle Tests', () => {
  test('It renders correctly', () => {
    render(<Toggle />);
  });
  test('It is not turned on when first loaded', () => {
    const { getByRole } = render(<Toggle />);
    const toggle = getByRole('checkbox');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
  });
  test('It is not turned on when active is set to false', () => {
    const { getByRole } = render(<Toggle active={false} />);
    const toggle = getByRole('checkbox');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
  });
  test('It renders when set to active', () => {
    const { getByRole } = render(<Toggle active />);
    const toggle = getByRole('checkbox');
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });
  test('When showLabels is on the on and off labels show', () => {
    const { getByText } = render(<Toggle showLabels />);
    expect(getByText('Off')).toBeInTheDocument();
    expect(getByText('On')).toBeInTheDocument();
  });
  test('Clicking the toggle activates the toggle', () => {
    let active = false;
    const click = jest.fn(() => {
      active = true;
    });
    const { getByRole, rerender } = render(<Toggle onClick={click} active={active} />);
    const toggle = getByRole('checkbox');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(toggle);
    expect(click).toHaveBeenCalledTimes(1);
    rerender(<Toggle onClick={click} active={active} />);
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });
});