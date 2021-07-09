import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Toggle } from './index';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Toggle Tests', () => {
  test('It renders correctly', () => {
    render(<Toggle id="1" />);
  });
  test('It is not turned on when first loaded', () => {
    const { getByRole } = render(<Toggle id="1" />);
    const toggle = getByRole('checkbox');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
  });
  test('It is not turned on when active is set to false', () => {
    const { getByRole } = render(<Toggle id="1" active={false} />);
    const toggle = getByRole('checkbox');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
  });
  test('It renders when set to active', () => {
    const { getByRole } = render(<Toggle id="1" active />);
    const toggle = getByRole('checkbox');
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });
  test('When showLabels is on the off label show', () => {
    const { getByText } = render(<Toggle id="1" showLabels />);
    expect(getByText('Off')).toBeInTheDocument();
  });

  test('When showLabels is on and it is active the on label show', () => {
    const { getByText } = render(<Toggle id="1" active showLabels />);
    expect(getByText('On')).toBeInTheDocument();
  });
  test('Clicking the toggle activates the toggle', () => {
    let active = false;
    const click = jest.fn(() => {
      active = true;
    });
    const { getByRole, rerender } = render(<Toggle id="1" onClick={click} active={active} />);
    const toggle = getByRole('checkbox');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(toggle);
    expect(click).toHaveBeenCalledTimes(1);
    rerender(<Toggle id="1" onClick={click} active={active} />);
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });

  test('Pressing enter on the toggle activates the toggle', () => {
    let active = false;
    const click = jest.fn(() => {
      active = true;
    });
    const { getByRole, rerender } = render(<Toggle id="1" onClick={click} active={active} />);
    const toggle = getByRole('checkbox');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
    fireEvent.keyDown(toggle, { key: 'Enter' });
    expect(click).toHaveBeenCalledTimes(1);
    rerender(<Toggle id="1" onClick={click} active={active} />);
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });

  test('Pressing space on the toggle activates the toggle', () => {
    let active = false;
    const click = jest.fn(() => {
      active = true;
    });
    const { getByRole, rerender } = render(<Toggle id="1" onClick={click} active={active} />);
    const toggle = getByRole('checkbox');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
    fireEvent.keyDown(toggle, { key: ' ' });
    expect(click).toHaveBeenCalledTimes(1);
    rerender(<Toggle id="1" onClick={click} active={active} />);
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });

  test('Pressing any other key on the toggle does not activates the toggle', () => {
    let active = false;
    const click = jest.fn(() => {
      active = true;
    });
    const { getByRole, rerender } = render(<Toggle id="1" onClick={click} active={active} />);
    const toggle = getByRole('checkbox');
    expect(toggle.getAttribute('aria-checked')).toBe('false');
    fireEvent.keyDown(toggle, { key: 'A' });
    expect(click).toHaveBeenCalledTimes(0);
    rerender(<Toggle id="1" onClick={click} active={active} />);
    expect(toggle.getAttribute('aria-checked')).toBe('false');
  });

  test('It renders as expected in dark mode', () => {
    const { container } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Toggle id="1" showLabels active={false} />
      </FCThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  test('It renders as expected in dark mode when active', () => {
    const { container } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Toggle id="1" showLabels active={true} />
      </FCThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
