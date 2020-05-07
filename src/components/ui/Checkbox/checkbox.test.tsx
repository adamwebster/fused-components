import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Checkbox } from './index';
import { color } from '../../../styles/styles';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Checkbox Tests', () => {
  test('Renders the Checkbox component', () => {
    const { getByText } = render(<Checkbox id="cb1">I am a checkbox</Checkbox>);
    expect(getByText('I am a checkbox')).toBeInTheDocument();
  });
  test('Checks the checkbox', () => {
    let checked = false;
    const onChange = jest.fn(() => {
      checked = true;
    });
    const { getByText } = render(
      <Checkbox id="cb1" onChange={() => onChange()} checked={checked}>
        I am a checkbox
      </Checkbox>,
    );
    const checkbox = getByText('I am a checkbox');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(checked).toBe(true);
  });
  test('Checkbox is in its error state', () => {
    const { getByText } = render(
      <Checkbox id="cb1" inError>
        Checkbox
      </Checkbox>,
    );
    expect(getByText('Checkbox')).toHaveStyleRule('color', color.danger);
  });

  test('Checkbox is in its warning state', () => {
    const { getByText } = render(
      <Checkbox id="cb1" inWarning>
        Checkbox
      </Checkbox>,
    );
    expect(getByText('Checkbox')).toHaveStyleRule('color', color.warning);
  });

  test('Renders with theme provider value set to dark', () => {
    render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Checkbox id="cb1">Checkbox</Checkbox>
      </FCThemeProvider>,
    );
  });

  test('Correct icon shows when it is unchecked', () => {
    const { getByRole } = render(
      <Checkbox id="cb1" checked={false}>
        Checkbox
      </Checkbox>,
    );
    expect(getByRole('img')).toHaveClass('checkbox');
  });

  test('Correct icon shows when it is checked is set', () => {
    const { getByRole } = render(
      <Checkbox id="cb1" checked>
        Checkbox
      </Checkbox>,
    );
    expect(getByRole('img')).toHaveClass('checkbox-checked');
  });
});
