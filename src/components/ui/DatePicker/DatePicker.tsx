import React, { ReactElement, useState } from 'react';
import { Input } from '../Input';
import DatePickerMenu from './DatePickerMenu';

interface Props {
  value?: string;
  onChange?: (date: string) => void;
  selectedDate?: string;
}
const DatePicker = ({ value, selectedDate, onChange = () => undefined }: Props): ReactElement => {
  const [menuOpen, setMenuOpen] = useState(false);

  const changeDate = (date: any): void => {
    onChange(date);
    setMenuOpen(false);
  };
  return (
    <>
      <Input
        readOnly={true}
        value={value}
        onClick={() => !menuOpen && setMenuOpen(true)}
        placeholder="Click to choose a date"
      />
      <DatePickerMenu
        setMenuOpen={value => setMenuOpen(value)}
        changeDate={date => changeDate(date)}
        value={selectedDate}
        menuOpened={menuOpen}
      />
    </>
  );
};

export default DatePicker;
