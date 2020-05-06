import React, { useEffect, useState, useContext, useRef } from 'react';
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
  autoFocusDay?: boolean;
  inputRef?: any;
  menuRef?: any;
  setMenuOpen?: (value: boolean) => void;
}
const Calendar = ({
  onChange = (): void => undefined,
  selectedDate,
  autoFocusDay,
  size,
  inputRef,
  menuRef,
  setMenuOpen,
}: Props): React.ReactElement => {
  const dateToSet = selectedDate ? dayjs(selectedDate) : dayjs();
  const [daysOfTheWeek] = useState(
    dayjs()
      .localeData()
      .weekdaysShort(),
  );
  const [currentDay, setCurrentDay] = useState('');
  const [calendar, setCalendar] = useState([]);
  const [navigationUsed, setNavigationUsed] = useState(false);
  const [dayTabIndex, setDayTabIndex] = useState(dateToSet.format('D'));
  const [focusedDay, setFocusedDay] = useState<number>(
    parseInt(dayjs(selectedDate).format('D')) || parseInt(dayjs().format('D')),
  );
  const [monthChanged, setMonthChanged] = useState(false);
  let dateToRender = selectedDate ? dayjs(selectedDate) : dayjs();
  if (dateToRender.format() === 'Invalid Date') {
    dateToRender = dayjs();
  }
  const [selectedDateState, setSelectedDateState] = useState(dateToRender);

  const prevButtonRef = useRef<HTMLAnchorElement | null>(null);
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
    const startOfMonth = selectedDateState.startOf('month');
    const daysInTheMonth = selectedDateState.daysInMonth();
    const endOfMonth = selectedDateState.endOf('month');
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
        date: selectedDateState.format(`YYYY-${selectedDateState.get('month') + 1}-${d}`),
        timeStamp: dayjs(`${selectedDateState.get('year')}-${selectedDateState.get('month') + 1}-${d}`).format(),
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

    if (selectedDateState.get('month') === dayjs().get('month')) {
      setCurrentDay(dayjs().format('D'));
    } else {
      setCurrentDay('');
    }
  };

  const calendarKeyPress = (e: any, timeStamp: any): void => {
    if (e.key === 'Enter') {
      if (onChange) {
        onChange(timeStamp);
      }
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (dayButtonRefs) {
        if (focusedDay + 1 < dayButtonRefs.length) {
          if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay + 1].focus();
          setFocusedDay(focusedDay + 1);
        } else {
          setSelectedDateState(selectedDateState.add(1, 'month'));
          setFocusedDay(1);
          setDayTabIndex('1');
          dayButtonRefs[1].focus();
          setMonthChanged(true);
        }
      }
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (dayButtonRefs) {
        if (focusedDay - 1 > 0) {
          if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay - 1].focus();
          setFocusedDay(focusedDay - 1);
        } else {
          const numberOfDaysInMonth = selectedDateState.subtract(1, 'month').daysInMonth();
          setSelectedDateState(selectedDateState.subtract(1, 'month'));
          setDayTabIndex(numberOfDaysInMonth.toString());
          setFocusedDay(numberOfDaysInMonth);
          setMonthChanged(true);
        }
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (dayButtonRefs) {
        if (focusedDay + 7 < dayButtonRefs.length) {
          if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay + 7].focus();
          setFocusedDay(focusedDay + 7);
        } else {
          setSelectedDateState(selectedDateState.add(1, 'month'));
          setFocusedDay(1);
          setDayTabIndex('1');
          dayButtonRefs[1].focus();
          setMonthChanged(true);
        }
      }
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (dayButtonRefs) {
        if (focusedDay - 7 > 0) {
          if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay - 7].focus();
          setFocusedDay(focusedDay - 7);
        } else {
          const numberOfDaysInMonth = selectedDateState.subtract(1, 'month').daysInMonth();
          setSelectedDateState(selectedDateState.subtract(1, 'month'));
          setDayTabIndex(numberOfDaysInMonth.toString());
          setFocusedDay(numberOfDaysInMonth);
          setMonthChanged(true);
        }
      }
    }
    if (e.key === 'Escape') {
      if (inputRef) inputRef.current.focus();
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
                  onKeyDown={e => calendarKeyPress(e, item.timeStamp)}
                  tabIndex={dayTabIndex === item.day.toString() ? 0 : -1}
                  ref={(ref: HTMLButtonElement): void => {
                    if (ref) {
                      if (!ref.disabled) dayButtonRefs[(item.day as unknown) as number] = ref;
                    }
                  }}
                  onBlur={() => {
                    if (autoFocusDay) {
                      if (dayTabIndex === item.day.toString()) prevButtonRef.current?.focus();
                    }
                  }}
                  onFocus={() => setFocusedDay(parseInt(item.day))}
                  disabled={item.otherMonth}
                  onMouseDown={(): void => onChange(item.timeStamp)}
                  aria-selected={parseInt(item.day) === focusedDay && !item.otherMonth}
                >
                  <span
                    aria-hidden="false"
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

  const handleInputKeyPress = (e: any) => {
    console.log(e.key);
    if (e.key === 'ArrowDown') {
      if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay].focus();
    }
    if (e.key === 'Escape' || e.key === 'Enter') {
      if (menuRef) {
        if (setMenuOpen) {
          onChange(dayjs(e.target.value).format() === 'Invalid Date' ? undefined : dayjs(e.target.value));
          setMenuOpen(false);
        }
      }
    } else if (e.key !== 'Tab') {
      if (setMenuOpen) setMenuOpen(true);
    }
  };

  useEffect(() => {
    getWeeks();
  }, [selectedDateState]);

  useEffect(() => {
    setSelectedDateState(dateToRender);
  }, [selectedDate]);

  useEffect(() => {
    if (autoFocusDay) {
      if (dayButtonRefs) {
        if (monthChanged) {
          if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay].focus();
        }
      }
    }
  }, [dayButtonRefs]);

  useEffect(() => {
    if (dayButtonRefs) {
      if (dayButtonRefs[focusedDay]) dayButtonRefs[focusedDay].focus();
    }
  }, [focusedDay]);

  useEffect(() => {
    if (inputRef) inputRef.current.addEventListener('keydown', (e: any) => handleInputKeyPress(e));
    return () => {
      if (inputRef) {
        if (inputRef.current) inputRef.current.removeEventListener('keydown', (e: any) => handleInputKeyPress(e));
      }
    };
  }, []);
  const nextMonth = (): void => {
    // console.log(selectedDateState);
    setSelectedDateState(selectedDateState.add(1, 'month'));
    setDayTabIndex('1');
    setNavigationUsed(true);
    setFocusedDay(1);
  };

  const previousMonth = (): void => {
    setSelectedDateState(selectedDateState.subtract(1, 'month'));
    setDayTabIndex('1');
    setNavigationUsed(true);
    setFocusedDay(1);
  };

  return (
    <CalendarWrapper calendarWidth={size}>
      <CalendarHeader>
        <CalendarTitle aria-live="assertive" theme={theme.theme}>
          <span>{`${selectedDateState.format('MMMM')} ${selectedDateState.format('YYYY')}`}</span>
        </CalendarTitle>
        <CalendarControl>
          <CalendarControlButtons
            title="Previous month"
            forwardedAs="a"
            tabIndex={0}
            onKeyPress={(e: any): any => {
              if (e.key === 'Enter') previousMonth();
            }}
            ref={prevButtonRef}
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
      <Table role="group">
        <thead>
          <tr>{dayNames}</tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </Table>
    </CalendarWrapper>
  );
};

export default Calendar;
