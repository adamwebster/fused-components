import React, { ReactElement, useState, useRef, useEffect } from 'react';
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
    const [stateValue, setStateValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const changeDate = (date: string): void => {
      onChange(date);
      setMenuOpen(false);
    };
    useEffect(() => {
      setStateValue(value);
    }, [value]);
    return (
      <DatePickerWrapper>
        <Input
          value={stateValue}
          ref={ref || inputRef}
          onChange={(e: any) => setStateValue(e.target.value)}
          onFocus={() => !menuOpen && setMenuOpen(true)}
          onClick={(): false | void => !menuOpen && setMenuOpen(true)}
          placeholder={placeholder}
        />
        <DatePickerMenu
          setMenuOpen={(value): false | void => setMenuOpen(value)}
          changeDate={(date): false | void => changeDate(date)}
          value={selectedDate}
          menuOpened={menuOpen}
          inputRef={inputRef}
        />
      </DatePickerWrapper>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
