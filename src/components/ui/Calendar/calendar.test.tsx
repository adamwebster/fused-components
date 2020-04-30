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
    fireEvent.click(dateButton);
    expect(date).not.toBe('date');
  });

  test('Clicking the previous buttons has the desired effect', () => {
    const { getAllByRole } = render(<Calendar />);
    const nextButton = getAllByRole('button')[0];
    fireEvent.click(nextButton);
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
});
