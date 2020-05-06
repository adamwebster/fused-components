import React, { useState, ReactElement } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '../components/ui/DatePicker';
import { FCThemeProvider } from '../theming/FCTheme';
import { DarkModeWrapper } from '../common/styles';

export const DatePickerDemo = (): ReactElement => {
  const [date, setDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  return (
    <DatePicker
      onChange={(date): void => {
        setSelectedDate(date);
        setDate(dayjs(date).format('MM/DD/YYYY'));
      }}
      selectedDate={selectedDate}
      value={date}
    />
  );
};

export const DatePickerDarkDemo = (): ReactElement => {
  const [date, setDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  return (
    <FCThemeProvider value={{ theme: 'dark' }}>
      <DarkModeWrapper>
        <DatePicker
          onChange={(date): void => {
            setSelectedDate(date);
            setDate(dayjs(date).format('MM/DD/YYYY'));
          }}
          selectedDate={selectedDate}
          value={date}
        />
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
