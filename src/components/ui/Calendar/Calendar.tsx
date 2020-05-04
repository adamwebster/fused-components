import React, { useEffect, useState, useContext } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import isoWeek from 'dayjs/plugin/isoWeek';
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
import { FCTheme } from '../../../theming/FCTheme';
dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
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
  const [focusedDay, setFocusedDay] = useState<number>(parseInt(dayjs().format('D')));
  const dayButtonRefs: Array<HTMLButtonElement> = [];

  const theme = useContext(FCTheme);
  const dayNames = daysOfTheWeek.map((day: string) => {
    return (
      <DayName theme={theme.theme} key={day}>
        {day}
      </DayName>
    );
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
          {row.map((item: { day: string; otherMonth: boolean; date: string; timeStamp: string }, index: any) => {
            return (
              <Day
                theme={theme.theme}
                className={`${item.day.toString() === currentDay ? `current-day` : ''}${
                  item.otherMonth ? 'other-month' : ''
                }${
                  item.date && dayjs(item.date).format('MMMM/DD/YYYY') === dayjs(selectedDate).format('MMMM/DD/YYYY')
                    ? ' selected-day'
                    : ''
                }`}
                key={item.date}
              >
                <button
                  ref={(ref: HTMLButtonElement): void => {
                    if (ref) {
                      if (!ref.disabled) dayButtonRefs[(item.day as unknown) as number] = ref;
                    }
                  }}
                  disabled={item.otherMonth}
                  onClick={(): void => onChange(item.timeStamp)}
                >
                  <span
                    aria-label={daysOfTheWeek[index] + ' ' + dayjs(item.date).format('MMMM Do YYYY')}
                    className="day-number"
                  >
                    {item.day}
                  </span>
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
  useEffect(() => {
    console.log(focusedDay);
    if (dayButtonRefs) {
      if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay].focus();
    }
  }, [dayButtonRefs]);
  const nextMonth = (): void => {
    setDate(date.add(1, 'month'));
  };

  const previousMonth = (): void => {
    setDate(date.subtract(1, 'month'));
  };

  const calendarKeyPress = (e: any) => {
    console.log(e.key, dayButtonRefs, focusedDay);

    if (e.key === 'ArrowRight') {
      console.log('here');
      e.preventDefault();
      if (dayButtonRefs) {
        if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay + 1].focus();
        setFocusedDay(focusedDay + 1);
      }
    }

    if (e.key === 'ArrowLeft') {
      console.log('here');
      e.preventDefault();

      if (dayButtonRefs) {
        if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay - 1].focus();
        setFocusedDay(focusedDay - 1);
      }
    }
    if (e.key === 'ArrowDown') {
      console.log('here');
      e.preventDefault();

      if (dayButtonRefs) {
        if (focusedDay + 7 < dayButtonRefs.length) {
          if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay + 7].focus();
          setFocusedDay(focusedDay + 7);
        } else {
          setDate(date.add(1, 'month'));
          setFocusedDay(1);
          dayButtonRefs[1].focus();
        }
      }
    }
    if (e.key === 'ArrowUp') {
      console.log('here');
      e.preventDefault();
      if (dayButtonRefs) {
        console.log(focusedDay - 7);
        if (focusedDay - 7 > 0) {
          if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay - 7].focus();
          setFocusedDay(focusedDay - 7);
        } else {
          setDate(date.subtract(1, 'month'));
        }
      }
    }
  };

  return (
    <CalendarWrapper onKeyDown={e => calendarKeyPress(e)} calendarWidth={size}>
      <CalendarHeader>
        <CalendarTitle aria-live="assertive" theme={theme.theme}>
          <span>{`${date.format('MMMM')} ${date.format('YYYY')}`}</span>
        </CalendarTitle>
        <CalendarControl>
          <CalendarControlButtons
            title="Previous month"
            forwardedAs="a"
            tabIndex={0}
            onKeyPress={(e: any): any => {
              if (e.key === 'Enter') previousMonth();
            }}
            onClick={(): void => previousMonth()}
          >
            <SvgWrapper>
              <Icon aria-label="Arrow left" icon="chevron-left" />
            </SvgWrapper>
          </CalendarControlButtons>
          <CalendarControlButtons
            tabIndex={0}
            title="Next month"
            forwardedAs="a"
            onClick={(): void => nextMonth()}
            onKeyPress={(e: any): any => {
              if (e.key === 'Enter') nextMonth();
            }}
          >
            <SvgWrapper>
              <Icon aria-label="Arrow right" icon="chevron-right" />
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
