import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { Input } from './index';
import userEvent from '@testing-library/user-event';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('FormField Input', () => {
  test('Renders the Input component', () => {
    const { getByPlaceholderText } = render(<Input id="1" placeholder="Test placeholder" />);
    expect(getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });
  test('Changes the value on change', () => {
    let initialValue = '';
    const onChange = jest.fn(e => {
      initialValue = e.target.value;
    });

    const { getByPlaceholderText, rerender } = render(
      <Input id="1" value={initialValue} onChange={e => onChange(e)} placeholder="Test placeholder" />,
    );

    const input = getByPlaceholderText('Test placeholder');
    userEvent.type(input, 'Hello World');
    expect(onChange).toBeCalledTimes(11);
    rerender(<Input id="1" value={initialValue} onChange={e => onChange(e)} placeholder="Test placeholder" />);
    expect(input).toHaveValue('Hello World');
    expect(initialValue).toBe('Hello World');
  });

  test('Renders the Input as disabled', () => {
    const { getByPlaceholderText } = render(<Input id="1" disabled placeholder="Test placeholder" />);
    expect(getByPlaceholderText('Test placeholder')).toBeDisabled();
  });

  test('Has the correct styles when in error', () => {
    const { container } = render(<Input id="1" icon="check-circle" inError placeholder="Test placeholder" />);
    expect(container).toMatchSnapshot();
  });

  test('Has the correct styles when in warning', () => {
    const { container } = render(<Input id="1" icon="check-circle" inWarning placeholder="Test placeholder" />);
    expect(container).toMatchSnapshot();
  });

  test('Has the icon when one is attached to it', () => {
    const { getByRole } = render(<Input id="1" icon="check-circle" placeholder="Test placeholder" />);
    expect(getByRole('img', { hidden: true })).toHaveClass('check-circle');
  });

  test('Is readonly', () => {
    const { getByPlaceholderText } = render(<Input id="1" readOnly placeholder="Test placeholder" />);
    expect(getByPlaceholderText('Test placeholder').getAttribute('readonly')).toBe('');
  });
  test('Sets the id', () => {
    const { getByPlaceholderText } = render(<Input id="Input control" placeholder="Test placeholder" />);
    expect(getByPlaceholderText('Test placeholder').getAttribute('id')).toBe('Input control');
  });

  test('Autocomplete can be set to off', () => {
    const { getByPlaceholderText } = render(
      <Input id="Input control" autoComplete="off" placeholder="Test placeholder" />,
    );
    expect(getByPlaceholderText('Test placeholder').getAttribute('autocomplete')).toBe('off');
  });

  test('Has the correct styles when in dark mode', () => {
    const { container } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Input id="1" icon="check-circle" placeholder="Test placeholder" />
      </FCThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
