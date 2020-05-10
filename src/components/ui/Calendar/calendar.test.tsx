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

  test('If space is hit with onChange then nothing is returned', () => {
    let date = 'date';
    const onChange = jest.fn(dateReturned => {
      date = dateReturned;
    });
    const { getByText } = render(<Calendar />);
    const dateItem = getByText('15');
    fireEvent.keyDown(dateItem, { key: 'Enter' });
    expect(date).toBe('date');
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  test('The date changes focus when the right arrow key is pressed', () => {
    const { getAllByText } = render(<Calendar selectedDate={dayjs('May 5 2020')} />);
    const dateItem = getAllByText('5')[0];
    fireEvent.keyDown(dateItem, { key: 'ArrowRight' });
    const dateItemSelected = getAllByText('6')[0];
    expect(dateItemSelected.getAttribute('aria-selected')).toBe('true');
  });
  test('The date changes focus when the left arrow key is pressed', () => {
    const { getAllByText } = render(<Calendar selectedDate={dayjs('May 5 2020')} />);
    const dateItem = getAllByText('5')[0];
    fireEvent.keyDown(dateItem, { key: 'ArrowLeft' });
    const dateItemSelected = getAllByText('4')[0];
    expect(dateItemSelected.getAttribute('aria-selected')).toBe('true');
  });

  test('The date changes focus when the right arrow down is pressed', () => {
    const { getAllByText } = render(<Calendar selectedDate={dayjs('May 5 2020')} />);
    const dateItem = getAllByText('5')[0];
    fireEvent.keyDown(dateItem, { key: 'ArrowDown' });
    const dateItemSelected = getAllByText('12')[0];
    expect(dateItemSelected.getAttribute('aria-selected')).toBe('true');
  });

  test('The date changes focus when the right arrow up is pressed', () => {
    const { getByText, getAllByText } = render(<Calendar selectedDate={dayjs('May 12 2020')} />);
    const dateItem = getByText('15');
    fireEvent.keyDown(dateItem, { key: 'ArrowUp' });
    const dateItemSelected = getAllByText('5')[0];
    expect(dateItemSelected.getAttribute('aria-selected')).toBe('true');
  });

  test('The month changes when the right arrow is clicked on the last day', () => {
    const { getByText, getAllByText } = render(<Calendar autoFocusDay selectedDate={dayjs('May 31 2020')} />);
    const dateItem = getByText('31');
    fireEvent.keyDown(dateItem, { key: 'ArrowRight' });
    const dateItemSelected = getAllByText('1')[0];
    expect(dateItemSelected.getAttribute('aria-selected')).toBe('true');
  });

  test('The month changes when the left arrow is clicked on the first day', () => {
    const { getAllByText } = render(<Calendar autoFocusDay selectedDate={dayjs('May 1 2020')} />);
    const dateItem = getAllByText('1')[0];
    fireEvent.keyDown(dateItem, { key: 'ArrowLeft' });
    const dateItemSelected = getAllByText('30')[1];
    expect(dateItemSelected.getAttribute('aria-selected')).toBe('true');
  });

  test('The month changes when the down arrow is clicked on a day in the last week', () => {
    const { getAllByText } = render(<Calendar autoFocusDay selectedDate={dayjs('May 31 2020')} />);
    const dateItem = getAllByText('27')[1];
    fireEvent.keyDown(dateItem, { key: 'ArrowDown' });
    const dateItemSelected = getAllByText('1')[0];
    expect(dateItemSelected.getAttribute('aria-selected')).toBe('true');
  });
  test('The month changes when the up arrow is clicked on a day in the first week', () => {
    const { getAllByText } = render(<Calendar autoFocusDay selectedDate={dayjs('May 3 2020')} />);
    const dateItem = getAllByText('3')[0];
    fireEvent.keyDown(dateItem, { key: 'ArrowUp' });
    const dateItemSelected = getAllByText('30')[1];
    expect(dateItemSelected.getAttribute('aria-selected')).toBe('true');
  });

  test('The previous button becomes focused on blur of the day when autoFocusDay is set', () => {
    const { getByText, getAllByRole } = render(<Calendar autoFocusDay selectedDate={dayjs('May 15 2020')} />);
    const dateItemSelected = getByText('15');
    fireEvent.blur(dateItemSelected);
    const prevButton = getAllByRole('button')[0];
    expect(prevButton).toHaveFocus();
  });

  test('The previous button is not focused on blur of the day when autoFocusDay is not set', () => {
    const { getByText, getAllByRole } = render(
      <>
        <Calendar selectedDate={dayjs('May 15 2020')} />
        <button>Tes Button</button>
      </>,
    );
    const dateItemSelected = getByText('15');
    fireEvent.blur(dateItemSelected);
    const prevButton = getAllByRole('button')[0];
    expect(prevButton).not.toHaveFocus();
  });

  test('Pressing enter on the next button loads the next month', () => {
    const { getByText, getAllByRole } = render(<Calendar />);

    const nextButton = getAllByRole('button')[1];
    fireEvent.keyDown(nextButton, { key: 'Enter' });
    const calendarHeader = getByText(
      dayjs()
        .add(1, 'month')
        .format('MMMM YYYY'),
    );
    expect(calendarHeader).toBeInTheDocument();
  });

  test('Pressing enter on the previous button loads the next month', () => {
    const { getAllByRole, getByText } = render(<Calendar />);

    const prevButton = getAllByRole('button')[0];
    fireEvent.keyDown(prevButton, { key: 'Enter' });
    const calendarHeader = getByText(
      dayjs()
        .subtract(1, 'month')
        .format('MMMM YYYY'),
    );
    expect(calendarHeader).toBeInTheDocument();
  });

  test('Pressing escape does nothing', () => {
    const { getAllByText } = render(<Calendar />);

    const dateItem = getAllByText('1')[0];
    fireEvent.keyDown(dateItem, { key: 'Escape' });
  });

  test('The component still renders o when an invalid selected date is passed to it', () => {
    render(<Calendar selectedDate="thdsfsdffdf" />);
  });
});
