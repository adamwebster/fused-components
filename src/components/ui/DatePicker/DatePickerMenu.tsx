import React, { useEffect, useRef, ReactElement } from 'react';
import { Calendar } from '../Calendar';
import { CalendarMenu } from './style';
import { Placement as PopperPlacements } from '@popperjs/core';

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  menuOpened: boolean;
  value: string | undefined;
  changeDate: (date: string) => void;
  setMenuOpen: (value: boolean, menuMounted: boolean) => void;
  inputRef?: any;
  dateFormat?: string;
  placement?: PopperPlacements;
}
const DatePickerMenu = ({
  menuOpened,
  value,
  inputRef,
  changeDate,
  setMenuOpen,
  dateFormat,
  placement,
  ...rest
}: Props): ReactElement => {
  const menuRef = useRef(null);
  const handleClickOutside = (e: MouseEvent): void => {
    const test = (e.target as HTMLElement).parentNode;
    if (
      // Must be some better way to test if the button is being clicked or not
      menuRef.current !== e.target &&
      menuRef.current !== test?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode &&
      menuRef.current !== test?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode &&
      menuRef.current !== test?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode
    ) {
      if (menuRef.current) {
        setMenuOpen(false, true);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', e => handleClickOutside(e));
    return (): void => {
      document.removeEventListener('mousedown', e => handleClickOutside(e));
    };
  });
  useEffect(() => {
    return () => {
      menuRef.current = null;
    };
  }, []);
  return (
    <>
      {menuOpened && (
        <CalendarMenu
          onKeyDown={e => {
            if (e.keyCode === 27) {
              e.preventDefault();
              if (menuRef.current) {
                setMenuOpen(false, true);
                inputRef.current.focus();
              }
            }
          }}
          role="dialog"
          aria-expanded="true"
          ref={menuRef}
          fitWidthToContent
          referenceElement={inputRef.current}
          placement={placement}
          {...rest}
        >
          <Calendar
            dateFormat={dateFormat}
            menuRef={menuRef}
            inputRef={inputRef}
            autoFocusDay
            setMenuOpen={value => setMenuOpen(value, true)}
            onChange={date => changeDate(date)}
            selectedDate={value}
          />
        </CalendarMenu>
      )}
    </>
  );
};

export default DatePickerMenu;
