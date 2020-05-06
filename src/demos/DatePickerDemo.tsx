import React, { useState, ReactElement } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '../components/ui/DatePicker';
import { FCThemeProvider } from '../theming/FCTheme';
import { DarkModeWrapper } from '../common/styles';

export const DatePickerDemo = (): ReactElement => {
  const [date, setDate] = useState('');
  return (
    <DatePicker
      placeholder="MM/DD/YYYY"
      onChange={(date): void => {
        setDate(dayjs(date).format('MM/DD/YYYY'));
      }}
      value={date}
    />
  );
};

export const DatePickerDarkDemo = (): ReactElement => {
  const [date, setDate] = useState('');
  return (
    <FCThemeProvider value={{ theme: 'dark' }}>
      <DarkModeWrapper>
        <DatePicker
          placeholder="MM/DD/YYYY"
          onChange={(date): void => {
            setDate(dayjs(date).format('MM/DD/YYYY'));
          }}
          value={date}
        />
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
