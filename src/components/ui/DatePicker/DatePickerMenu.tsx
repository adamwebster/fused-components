import React, { useEffect, useRef, useContext } from 'react';
import { CalendarMenu } from './style';
import { Calendar } from '../Calendar';
import { FCTheme } from '../../../theming/FCTheme';

interface Props {
  menuOpened: boolean;
  value: string | undefined;
  changeDate: (date: string) => void;
  setMenuOpen: (value: boolean, menuMounted: boolean) => void;
  inputRef?: any;
}
const DatePickerMenu = ({ menuOpened, value, inputRef, changeDate, setMenuOpen }: Props) => {
  const menuRef = useRef(null);
  const theme = useContext(FCTheme);
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
              }
            }
          }}
          theme={theme.theme}
          role="dialog"
          aria-expanded="true"
          ref={menuRef}
        >
          <Calendar
            menuRef={menuRef}
            inputRef={inputRef}
            autoFocusDay
            setMenuOpen={() => setMenuOpen(false, true)}
            onChange={date => changeDate(date)}
            selectedDate={value}
          />
        </CalendarMenu>
      )}
    </>
  );
};

export default DatePickerMenu;
