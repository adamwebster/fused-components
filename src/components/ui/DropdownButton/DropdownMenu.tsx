import React, { useContext, useEffect, useRef, ReactElement, ReactNode, useCallback } from 'react';

import { DropdownMenuStyled } from './style';
import { DropdownMenuContext } from './DropdownMenuContext';

export interface Props {
  children: ReactNode;
}

export const DropdownMenu = ({ children }: Props): ReactElement => {
  const { dropdownState, dispatch } = useContext(DropdownMenuContext);
  const menuRef = useRef(null);
  // const isMounted = useRef(true);
  // const [itemToFocus, setItemToFocus] = useState(0);
  const handleClickOutside = useCallback((e: MouseEvent): void => {
    const test = (e.target as HTMLElement).parentNode;
    if (dropdownState.buttonEl) {
      if (
        // Must be some better way to test if the button is being clicked or not
        dropdownState.buttonEl?.current !== e.target &&
        dropdownState.buttonEl?.current !== test?.parentNode?.parentNode &&
        dropdownState.buttonEl?.current !== test?.parentNode
      ) {
        if (menuRef) {
          dispatch({ type: 'SET_MENU_OPEN', payload: false });
          setTimeout(() => {
            dispatch({ type: 'SET_MENU_VISIBLE', payload: false });
          }, 200);
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /* Todo: Store selected item in context and set aria-selected based 
  on that. Make sure to keep focus on the button for this to work */
  // const handleButtonClick = (e: any) => {
  //   console.log(e, itemToFocus);
  //   if (menuRef) {
  //     switch (e.key) {
  //       case 'ArrowDown':
  //         setItemToFocus(itemToFocus + 1);
  //       default:
  //         return;
  //     }
  //   }
  // };

  return (
    <>
      {dropdownState.menuOpen && (
        <DropdownMenuStyled role="listbox" ref={menuRef} theme={dropdownState.theme} menuOpen={dropdownState.menuOpen}>
          {dropdownState.menuVisible && children}
        </DropdownMenuStyled>
      )}
    </>
  );
};
