import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Calendar } from './index';
import dayjs from 'dayjs';
import renderer from 'react-test-renderer';

afterEach(cleanup);

describe('Calendar tests', () => {
  test('It renders the calendar', () => {
    const { getByText } = render(<Calendar />);
    expect(getByText('Tue')).toBeInTheDocument();
  });

  test('If it is not the current month then the current day is not highlighted', () => {
    const { container, getAllByRole } = render(<Calendar />);
    const nextButton = getAllByRole('button')[1];
    fireEvent.click(nextButton);
    const today = container.querySelector('.current-day');
    expect(today).toBeFalsy();
  });
  test('If it is the current month the current day is highlight', () => {
    let date = 'date';
    const onChange = jest.fn(dateReturned => {
      date = dateReturned;
    });
    const { getByText } = render(<Calendar onChange={(date): void => onChange(date)} />);
    const dateButton = getByText('13');
    fireEvent.mouseDown(dateButton);
    expect(date).not.toBe('date');
  });

  test('Clicking the previous buttons has the desired effect', () => {
    const { getAllByRole } = render(<Calendar />);
    const prevButton = getAllByRole('button')[0];
    fireEvent.click(prevButton);
  });

  test('Setting the selected day sets the correct date', () => {
    const { container } = render(<Calendar selectedDate={dayjs()} />);
    expect(container.querySelector('.selected-day')).toBeInTheDocument();
  });

  test('Setting the size sets the calendar size', () => {
    const container = renderer.create(<Calendar size={450} />).toJSON();
    expect(container).toHaveStyleRule('width', '450px');
    expect(container).toHaveStyleRule('height', '450px');
  });

  test('The onChange function passes back the timestamp when an date is clicked by enter', () => {
    let date = 'date';
    const onChange = jest.fn(dateReturned => {
      date = dateReturned;
    });
    const { getByText } = render(<Calendar onChange={date => onChange(date)} />);
    const dateItem = getByText('15');
    fireEvent.keyDown(dateItem, { key: 'Enter' });
    expect(date).not.toBe('date');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('The date changes focus when the right arrow key is pressed', () => {
    const { getAllByText } = render(<Calendar selectedDate={dayjs('May 5 2020')} />);
    const dateItem = getAllByText('5')[0];
    fireEvent.keyDown(dateItem, { key: 'ArrowRight' });
    const dateItemSelected = getAllByText('6')[0];
    expect(dateItemSelected.parentElement?.getAttribute('aria-selected')).toBe('true');
  });
  test('The date changes focus when the left arrow key is pressed', () => {
    const { getAllByText } = render(<Calendar selectedDate={dayjs('May 5 2020')} />);
    const dateItem = getAllByText('5')[0];
    fireEvent.keyDown(dateItem, { key: 'ArrowLeft' });
    const dateItemSelected = getAllByText('4')[0];
    expect(dateItemSelected.parentElement?.getAttribute('aria-selected')).toBe('true');
  });

  test('The date changes focus when the right arrow down is pressed', () => {
    const { getAllByText } = render(<Calendar selectedDate={dayjs('May 5 2020')} />);
    const dateItem = getAllByText('5')[0];
    fireEvent.keyDown(dateItem, { key: 'ArrowDown' });
    const dateItemSelected = getAllByText('12')[0];
    expect(dateItemSelected.parentElement?.getAttribute('aria-selected')).toBe('true');
  });

  test('The date changes focus when the right arrow up is pressed', () => {
    const { getByText, getAllByText } = render(<Calendar selectedDate={dayjs('May 12 2020')} />);
    const dateItem = getByText('15');
    fireEvent.keyDown(dateItem, { key: 'ArrowUp' });
    const dateItemSelected = getAllByText('5')[0];
    expect(dateItemSelected.parentElement?.getAttribute('aria-selected')).toBe('true');
  });
});
