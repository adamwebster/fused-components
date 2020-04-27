import React, { useEffect, useRef } from 'react';
import { CalendarMenu } from './style';
import { Calendar } from '../Calendar';

interface Props {
  menuOpened: boolean;
  value: string | undefined;
  changeDate: (date: string) => void;
  setMenuOpen: (value: boolean) => void;
}
const DatePickerMenu = ({ menuOpened, value, changeDate, setMenuOpen }: Props) => {
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
      setMenuOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', e => handleClickOutside(e));
    return (): void => {
      document.removeEventListener('mousedown', e => handleClickOutside(e));
    };
  });
  return (
    <>
      {menuOpened && (
        <CalendarMenu ref={menuRef}>
          <Calendar onChange={date => changeDate(date)} selectedDate={value} />
        </CalendarMenu>
      )}
    </>
  );
};

export default DatePickerMenu;
