import React, { useState, ReactElement } from 'react';
import { DatePicker } from '../components/ui/DatePicker';
import { FCThemeProvider } from '../theming/FCTheme';
import { DarkModeWrapper } from '../common/styles';

export const DatePickerDemo = (): ReactElement => {
  const [date, setDate] = useState('');
  return (
    <DatePicker
      id="Date1"
      placeholder="MM/DD/YYYY"
      onChange={(date): void => {
        if (date) {
          setDate(date);
        }
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
          id="Date2"
          placeholder="MM/DD/YYYY"
          onChange={(date): void => {
            if (date) {
              setDate(date);
            }
          }}
          value={date}
        />
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
