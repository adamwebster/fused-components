import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { DatePicker } from '.';
import dayjs from 'dayjs';

afterEach(cleanup);

describe('Date picker Tests', () => {
  test('it renders the date picker component', () => {
    render(<DatePicker />);
  });

  test('it renders the date picker component', () => {
    const { getByPlaceholderText } = render(<DatePicker placeholder="Hello" />);
    expect(getByPlaceholderText('Hello')).toBeInTheDocument();
  });
  test('Menu opens when the input is clicked', () => {
    const { getByText, getByPlaceholderText } = render(<DatePicker />);
    const input = getByPlaceholderText('Click to choose a date');
    fireEvent.click(input);

    expect(getByText('15')).toBeInTheDocument();
  });

  test('Input value changes when date is picked', () => {
    let value = '';
    const onChange = jest.fn(date => {
      value = date;
    });
    const { getByText, getByPlaceholderText } = render(<DatePicker onChange={date => onChange(date)} />);
    const input = getByPlaceholderText('Click to choose a date');
    fireEvent.click(input);
    const dateToPick = getByText('15');
    fireEvent.click(dateToPick);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(dayjs(value).format('D')).toBe('15');
  });

  test('Clicking outside of the date picker closes the window', () => {
    const { queryByText, getByText, getByPlaceholderText } = render(
      <>
        <button onClick={() => console.log('click')}>Click me</button>
        <DatePicker />
      </>,
    );
    const input = getByPlaceholderText('Click to choose a date');
    fireEvent.click(input);
    const dateToPick = queryByText('15');
    expect(dateToPick).toBeInTheDocument();
    const button = getByText('Click me');
    fireEvent.mouseDown(button);
    const dateToPickNew = queryByText('15');
    expect(dateToPickNew).toBeFalsy();
  });
});
