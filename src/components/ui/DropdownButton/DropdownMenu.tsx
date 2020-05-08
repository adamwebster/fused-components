import React, { useContext, useEffect, useRef, ReactElement, ReactNode, useState } from 'react';

import { DropdownMenuStyled } from './style';
import { DropdownMenuContext, DropdownMenuConsumer } from './DropdownMenuContext';

export interface Props {
  children: ReactNode;
}

export const DropdownMenu = ({ children }: Props): ReactElement => {
  const DropdownContext = useContext(DropdownMenuContext);
  const menuRef = useRef(null);
  const isMounted = useRef(true);
  const [itemToFocus, setItemToFocus] = useState(0);
  const handleClickOutside = (e: MouseEvent): void => {
    const test = (e.target as HTMLElement).parentNode;
    if (DropdownContext) {
      if (
        // Must be some better way to test if the button is being clicked or not
        DropdownContext.buttonEl.current !== e.target &&
        DropdownContext.buttonEl.current !== test?.parentNode?.parentNode &&
        DropdownContext.buttonEl.current !== test?.parentNode
      ) {
        DropdownContext.hideMenu(isMounted.current);
      }
    }
  };
  useEffect(() => {
    //  DropdownContext.hideMenu();
    document.addEventListener('mousedown', e => handleClickOutside(e));
    return (): void => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', e => handleClickOutside(e));
    };
  });

  /* Todo: Store selected item in context and set aria-selected based 
  on that. Make sure to keep focus on the button for this to work */
  const handleButtonClick = (e: any) => {
    console.log(e, itemToFocus);
    if (menuRef) {
      switch (e.key) {
        case 'ArrowDown':
          menuRef?.current?.children[itemToFocus].focus();
          setItemToFocus(itemToFocus + 1);
        default:
          return;
      }
    }
  };
  useEffect(() => {
    if (DropdownContext) {
      DropdownContext.buttonEl?.current?.addEventListener('keydown', e => handleButtonClick(e));
    }
    return () => {
      isMounted.current = false;
    };
  }, [itemToFocus]);
  return (
    <DropdownMenuConsumer>
      {(appContext): ReactNode =>
        appContext && (
          <>
            <DropdownMenuStyled role="listbox" ref={menuRef} theme={appContext.theme} menuOpen={appContext.menuOpen}>
              {children}
            </DropdownMenuStyled>
          </>
        )
      }
    </DropdownMenuConsumer>
  );
};
