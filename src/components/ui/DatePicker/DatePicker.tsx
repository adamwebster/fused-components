import React, { ReactElement, useState, useRef, useEffect, HTMLAttributes } from 'react';
import { Input } from '../Input';
import DatePickerMenu from './DatePickerMenu';
import { DatePickerWrapper } from './style';
import { Placement as PopperPlacements } from '@popperjs/core';

interface Props extends HTMLAttributes<HTMLInputElement> {
  /** The id of the element. Required for accessibility.  */
  id: string;
  /** The value of the date picker */
  value?: string;
  /** What should happen when the date changes. Should at least change the value. */
  onDateChange?: (date: string) => void;
  /** Placeholder for the date picker input */
  placeholder?: string;
  /** The format of the date for example MM/DD/YYYY */
  dateFormat?: string;
  /** The placement of the dropdown menu. "auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" */
  placement?: PopperPlacements;
}
export const DatePicker = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      value,
      dateFormat = 'MM/DD/YYYY',
      onDateChange = (): unknown => undefined,
      placeholder = 'Click to choose a date',
      placement = 'bottom-start',
      ...rest
    }: Props,
    ref,
  ): ReactElement => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [stateValue, setStateValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const changeDate = (date: string): void => {
      onDateChange(date);
      setMenuOpen(false);
    };
    useEffect(() => {
      setStateValue(value);
    }, [value]);
    return (
      <DatePickerWrapper>
        <Input
          id={id}
          value={stateValue}
          ref={ref || inputRef}
          onChange={(e: any) => setStateValue(e.target.value)}
          onFocus={() => !menuOpen && setMenuOpen(true)}
          onClick={(): false | void => !menuOpen && setMenuOpen(true)}
          placeholder={placeholder}
          {...rest}
        />
        <DatePickerMenu
          setMenuOpen={(value): false | void => setMenuOpen(value)}
          changeDate={(date): false | void => changeDate(date)}
          value={stateValue}
          menuOpened={menuOpen}
          inputRef={ref || inputRef}
          placement={placement}
          dateFormat={dateFormat}
        />
      </DatePickerWrapper>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
