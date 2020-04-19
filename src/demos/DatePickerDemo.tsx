import React, { useState, ReactElement } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '../components/ui/DatePicker';

export const DatePickerDemo = (): ReactElement => {
  const [date, setDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  return (
    <DatePicker
      onChange={(date): void => {
        setSelectedDate(date);
        setDate(dayjs(date).format('MMMM Do, YYYY'));
      }}
      selectedDate={selectedDate}
      value={date}
    />
  );
};
