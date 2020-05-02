import React, { ReactElement, useState } from 'react';
import { Input } from '../Input';
import DatePickerMenu from './DatePickerMenu';
import { DatePickerWrapper } from './style';

interface Props {
  value?: string;
  onChange?: (date: string) => void;
  selectedDate?: string;
  placeholder?: string;
}
export const DatePicker = React.forwardRef<HTMLInputElement, Props>(
  (
    { value, selectedDate, onChange = (): unknown => undefined, placeholder = 'Click to choose a date' }: Props,
    ref,
  ): ReactElement => {
    const [menuOpen, setMenuOpen] = useState(false);

    const changeDate = (date: string): void => {
      onChange(date);
      setMenuOpen(false);
    };
    return (
      <DatePickerWrapper>
        <Input
          readOnly={true}
          value={value}
          ref={ref}
          onClick={(): false | void => !menuOpen && setMenuOpen(true)}
          placeholder={placeholder}
        />
        <DatePickerMenu
          setMenuOpen={(value): false | void => setMenuOpen(value)}
          changeDate={(date): false | void => changeDate(date)}
          value={selectedDate}
          menuOpened={menuOpen}
        />
      </DatePickerWrapper>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
