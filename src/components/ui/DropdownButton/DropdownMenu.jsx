import React, { useContext, useEffect, useRef } from "react";

import { DropdownMenuStyled } from "./style";
import DropdownMenuContext from "./DropdownMenuContext";

export const DropdownMenu = ({ children }) => {
  const DropdownContext = useContext(DropdownMenuContext);
  const menuRef = useRef(null);
  const handleClickOutside = e => {
    if (
      // Must be some better way to test if the button is being clicked or not
      menuRef.current !== e.target.parentNode &&
      DropdownContext.buttonEl.current !== e.target &&
      DropdownContext.buttonEl.current !== e.target.parentNode.parentNode.parentNode &&
      DropdownContext.buttonEl.current !== e.target.parentNode.parentNode
    ) {
      DropdownContext.hideMenu();
    }
  };
  useEffect(() => {
    //  DropdownContext.hideMenu();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <DropdownMenuContext.Consumer>
      {({ menuOpen, hasIcons }) => (
        <>
          <DropdownMenuStyled
            ref={menuRef}
            hasIcons={hasIcons}
            menuOpen={menuOpen}
          >
            {children}
          </DropdownMenuStyled>
        </>
      )}
    </DropdownMenuContext.Consumer>
  );
};
