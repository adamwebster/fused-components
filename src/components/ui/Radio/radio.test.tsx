import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Radio } from './index';
import { color } from '../../../styles/styles';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Radio Tests', () => {
  test('Renders the Radio component', () => {
    const { getByText } = render(<Radio id="1">I am a radio</Radio>);
    expect(getByText('I am a radio')).toBeInTheDocument();
  });
  test('Checks the radio', () => {
    let checked = false;
    const onChange = jest.fn(() => {
      checked = true;
    });
    const { getByText } = render(
      <Radio id="1" onChange={() => onChange()} checked={checked}>
        I am a radio
      </Radio>,
    );
    const radio = getByText('I am a radio');
    fireEvent.click(radio);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(checked).toBe(true);
  });
  test('Radio is in its error state', () => {
    const { getByText } = render(
      <Radio id="1" inError>
        Radio
      </Radio>,
    );
    expect(getByText('Radio')).toHaveStyleRule('color', color.danger);
  });

  test('Checkbox is in its warning state', () => {
    const { getByText } = render(
      <Radio id="1" inWarning>
        Radio
      </Radio>,
    );
    expect(getByText('Radio')).toHaveStyleRule('color', color.warning);
  });

  test('Renders with theme provider value set to dark', () => {
    render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Radio id="1">Checkbox</Radio>
      </FCThemeProvider>,
    );
  });

  test('Correct icon shows when it is unchecked', () => {
    const { getByRole } = render(
      <Radio id="1" checked={false}>
        Checkbox
      </Radio>,
    );
    expect(getByRole('img')).toHaveClass('radio');
  });

  test('Correct icon shows when it is checked is set', () => {
    const { getByRole } = render(
      <Radio id="1" checked>
        Checkbox
      </Radio>,
    );
    expect(getByRole('img')).toHaveClass('radio-checked');
  });
});
