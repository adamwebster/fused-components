import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import { Icon } from '../../icon/index';
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
  CalendarControlButtons,
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
        date: endOfMonth.subtract(d + 1, 'day').format('YYYY MM DD'),
      });
    }

    for (let d = 1; d <= daysInTheMonth; d++) {
      daysInMonth.push({
        day: d,
        date: date.format(`YYYY-${date.get('month') + 1}-${d}`),
        timeStamp: dayjs(`${date.get('year')}-${date.get('month') + 1}-${d}`).format(),
      });
    }

    const daysBefore = daysInMonth.length + blankDays.length;
    const numberOfWeeks = dayjs.duration(daysBefore, 'days').asWeeks();
    const totalNumberOfDaysInCalendar = Math.ceil(numberOfWeeks) * 7;

    for (let d = totalNumberOfDaysInCalendar, i = 0; d > daysBefore; d--, i++) {
      blankDaysEnd.push({
        day: endOfMonth.add(i + 1, 'day').format('D'),
        otherMonth: true,
        date: endOfMonth.add(i + 1, 'day').format('YYYY MM DD'),
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
          {row.map((item: { day: string; otherMonth: boolean; date: string; timeStamp: string }) => {
            return (
              <Day
                className={`${item.day.toString() === currentDay ? `current-day` : ''}${
                  item.otherMonth ? 'other-month' : ''
                }${
                  item.date && dayjs(item.date).format('MMMM/DD/YYYY') === dayjs(selectedDate).format('MMMM/DD/YYYY')
                    ? ' selected-day'
                    : ''
                }`}
                key={item.date}
              >
                <button disabled={item.otherMonth} onClick={(): void => onChange(item.timeStamp)}>
                  <span className="day-number">{item.day}</span>
                </button>
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
          <CalendarControlButtons forwardedAs="a" onClick={(): void => previousMonth()}>
            <SvgWrapper>
              <Icon icon="chevron-left" />
            </SvgWrapper>
          </CalendarControlButtons>
          <CalendarControlButtons forwardedAs="a" onClick={(): void => nextMonth()}>
            <SvgWrapper>
              <Icon icon="chevron-right" />
            </SvgWrapper>
          </CalendarControlButtons>
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
