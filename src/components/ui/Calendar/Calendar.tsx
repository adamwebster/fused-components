import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import { Icon } from '../../icon/index';
import { Button } from '../Button/index';
import {
  Table,
  CalendarWrapper,
  CalendarHeader,
  CalendarTitle,
  CalendarControl,
  SvgWrapper,
  Day,
  DayName,
  Week,
} from './style';
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(duration);

interface Props {
  onChange?: (date: any) => void;
  selectedDate?: dayjs.Dayjs | string;
  size?: number;
}
const Calendar = ({ onChange = (): void => undefined, selectedDate = dayjs(), size }: Props): React.ReactElement => {
  const [date, setDate] = useState(dayjs());
  const [daysOfTheWeek] = useState(
    dayjs()
      .localeData()
      .weekdaysShort(),
  );
  const [currentDay, setCurrentDay] = useState('');

  const [calendar, setCalendar] = useState([]);

  const dayNames = daysOfTheWeek.map((day: string) => {
    return <DayName key={day}>{day}</DayName>;
  });
  const getWeeks = (): void => {
    const blankDays = [];
    const daysInMonth = [];
    const blankDaysEnd = [];
    const startOfMonth = date.startOf('month');
    const daysInTheMonth = date.daysInMonth();
    const endOfMonth = date.endOf('month');

    for (let d = 0; d < startOfMonth.day(); d++) {
      blankDays.push({
        day: startOfMonth.subtract(d + 1, 'day').format('D'),
        otherMonth: true,
        date: null,
      });
    }

    for (let d = 1; d <= daysInTheMonth; d++) {
      daysInMonth.push({
        day: d,
        date: `${date.format('YYYY')}-${date.get('month') + 1}-${d}`,
      });
    }

    const daysBefore = daysInMonth.length + blankDays.length;
    const numberOfWeeks = dayjs.duration(daysBefore, 'days').asWeeks();
    const totalNumberOfDaysInCalendar = Math.ceil(numberOfWeeks) * 7;

    for (let d = totalNumberOfDaysInCalendar, i = 0; d > daysBefore; d--, i++) {
      blankDaysEnd.push({
        day: endOfMonth.add(i + 1, 'day').format('D'),
        otherMonth: true,
        date: null,
      });
    }
    const totalSlots = [...blankDays.reverse(), ...daysInMonth, ...blankDaysEnd];
    const rows: ({ day: string } | { day: number })[][] = [];
    let cells: ({ day: string } | { day: number })[] = [];
    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row); // if index not equal 7 that means not go to next week
      } else {
        rows.push(cells); // when reach next week we contain all td in last week to rows
        cells = []; // empty container
        cells.push(row); // in current loop we still push current row to new container
      }
      if (i === totalSlots.length - 1) {
        // when end loop we add remain date
        rows.push(cells);
      }
    });
    setCalendar(rows as any);

    if (date.get('month') === dayjs().get('month')) {
      setCurrentDay(dayjs().format('D'));
    } else {
      setCurrentDay('');
    }
  };

  const calendarRows = calendar.map((row: any) => {
    if (row.length > 0)
      return (
        <Week key={Math.random()}>
          {row.map((item: { day: string; otherMonth: boolean; date: string }, index: number) => {
            return (
              <Day
                className={`${item.day.toString() === currentDay ? `current-day` : ''}${
                  item.otherMonth ? 'other-month' : ''
                }${
                  item.date && dayjs(item.date).format('MMMM/DD/YYYY') === dayjs(selectedDate).format('MMMM/DD/YYYY')
                    ? ' selected-day'
                    : ''
                }`}
                key={item.day ? `day-${item.day}` : `blank-day-${index}`}
              >
                <Button disabled={item.otherMonth} onClick={(): void => onChange(item.date)} as="a">
                  {item.day}
                </Button>
              </Day>
            );
          })}
        </Week>
      );
    return null;
  });

  useEffect(() => {
    getWeeks();
  }, [date]);

  const nextMonth = (): void => {
    setDate(date.add(1, 'month'));
  };

  const previousMonth = (): void => {
    setDate(date.subtract(1, 'month'));
  };
  return (
    <CalendarWrapper calendarWidth={size}>
      <CalendarHeader>
        <CalendarTitle>
          <span>{`${date.format('MMMM')} ${date.format('YYYY')}`}</span>
        </CalendarTitle>
        <CalendarControl>
          <Button as="a">
            <SvgWrapper onClick={(): void => previousMonth()}>
              <Icon icon="chevron-left" />
            </SvgWrapper>
          </Button>
          <Button as="a" onClick={(): void => nextMonth()}>
            <SvgWrapper>
              <Icon icon="chevron-right" />
            </SvgWrapper>
          </Button>
        </CalendarControl>
      </CalendarHeader>
      <Table>
        <thead>
          <tr>{dayNames}</tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </Table>
    </CalendarWrapper>
  );
};

export default Calendar;
