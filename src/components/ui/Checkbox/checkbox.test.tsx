import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Checkbox } from './index';

afterEach(cleanup);

describe('Checkbox Tests', () => {
  test('Renders the Checkbox component', () => {
    const { getByText } = render(<Checkbox>I am a checkbox</Checkbox>);
    expect(getByText('I am a checkbox')).toBeInTheDocument();
  });
  test('Checks the checkbox', () => {
    let checked = false;
    const onChange = jest.fn(() => {
      checked = true;
    });
    const { getByText } = render(
      <Checkbox onChange={() => onChange()} checked={checked}>
        I am a checkbox
      </Checkbox>,
    );
    const checkbox = getByText('I am a checkbox');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(checked).toBe(true);
  });
});
