import React, { useContext, useEffect, useRef } from 'react';

import { DropdownMenuStyled } from './style';
import { DropdownMenuContext, DropdownMenuConsumer } from './DropdownMenuContext';

export interface Props {
  children: any;
}

export const DropdownMenu = ({ children }: Props) => {
  const DropdownContext = useContext(DropdownMenuContext);
  const menuRef = useRef(null);
  const handleClickOutside = (e: MouseEvent) => {
    const test = (e.target as HTMLElement).parentNode;
    if (DropdownContext) {
      if (
        // Must be some better way to test if the button is being clicked or not
        DropdownContext.buttonEl.current !== e.target &&
        DropdownContext.buttonEl.current !== test!.parentNode!.parentNode &&
        DropdownContext.buttonEl.current !== test!.parentNode
      ) {
        DropdownContext.hideMenu();
      }
    }
  };
  useEffect(() => {
    //  DropdownContext.hideMenu();
    document.addEventListener('mousedown', e => handleClickOutside(e));
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', e => handleClickOutside(e));
    };
  });
  return (
    <DropdownMenuConsumer>
      {appContext =>
        appContext && (
          <>
            <DropdownMenuStyled ref={menuRef} theme={appContext.theme} menuOpen={appContext.menuOpen}>
              {children}
            </DropdownMenuStyled>
          </>
        )
      }
    </DropdownMenuConsumer>
  );
};
