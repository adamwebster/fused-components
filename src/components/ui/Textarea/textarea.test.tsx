import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { Textarea } from './index';
import userEvent from '@testing-library/user-event';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Textarea Input', () => {
  test('Renders the Textarea component', () => {
    const { getByPlaceholderText } = render(<Textarea placeholder="Test placeholder" />);
    expect(getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });
  test('Changes the value on change', () => {
    let initialValue = '';
    const onChange = jest.fn(e => {
      initialValue = e.target.value;
    });

    const { getByPlaceholderText, rerender } = render(
      <Textarea value={initialValue} onChange={e => onChange(e)} placeholder="Test placeholder" />,
    );

    const input = getByPlaceholderText('Test placeholder');
    userEvent.type(input, 'Hello World');
    expect(onChange).toBeCalledTimes(11);
    rerender(<Textarea value={initialValue} onChange={e => onChange(e)} placeholder="Test placeholder" />);
    expect(input).toHaveValue('Hello World');
    expect(initialValue).toBe('Hello World');
  });

  test('Renders the Input as disabled', () => {
    const { getByPlaceholderText } = render(<Textarea disabled placeholder="Test placeholder" />);
    expect(getByPlaceholderText('Test placeholder')).toBeDisabled();
  });

  test('Is readonly', () => {
    const { getByPlaceholderText } = render(<Textarea readOnly placeholder="Test placeholder" />);
    expect(getByPlaceholderText('Test placeholder').getAttribute('readonly')).toBe('');
  });
  test('Sets the id', () => {
    const { getByPlaceholderText } = render(<Textarea id="Input control" placeholder="Test placeholder" />);
    expect(getByPlaceholderText('Test placeholder').getAttribute('id')).toBe('Input control');
  });

  test('Autocomplete can be set to off', () => {
    const { getByPlaceholderText } = render(
      <Textarea id="Input control" autoComplete="off" placeholder="Test placeholder" />,
    );
    expect(getByPlaceholderText('Test placeholder').getAttribute('autocomplete')).toBe('off');
  });

  test('Has the correct styles when in dark mode', () => {
    const { container } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Textarea placeholder="Test placeholder" />
      </FCThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
