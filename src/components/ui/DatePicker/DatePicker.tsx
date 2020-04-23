import React, { ReactElement, useState } from 'react';
import { Input } from '../Input';
import DatePickerMenu from './DatePickerMenu';

interface Props {
  value?: string;
  onChange?: (date: string) => void;
  selectedDate?: string;
}
const DatePicker = React.forwardRef<HTMLInputElement, Props>(
  ({ value, selectedDate, onChange = (): unknown => undefined }: Props, ref): ReactElement => {
    const [menuOpen, setMenuOpen] = useState(false);

    const changeDate = (date: string): void => {
      onChange(date);
      setMenuOpen(false);
    };
    return (
      <>
        <Input
          readOnly={true}
          value={value}
          ref={ref}
          onClick={(): false | void => !menuOpen && setMenuOpen(true)}
          placeholder="Click to choose a date"
        />
        <DatePickerMenu
          setMenuOpen={(value): false | void => setMenuOpen(value)}
          changeDate={(date): false | void => changeDate(date)}
          value={selectedDate}
          menuOpened={menuOpen}
        />
      </>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
