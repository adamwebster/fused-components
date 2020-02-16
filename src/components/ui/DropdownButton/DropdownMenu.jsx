import React, {useContext, useEffect, useRef}  from "react";

import { DropdownMenuStyled } from "./style";
import DropdownMenuContext from "./DropdownMenuContext";

export const DropdownMenu = ({ children }) => {
  const DropdownContext = useContext(DropdownMenuContext);
const menuRef = useRef(null);
  const handleClickOutside = (e) => {
    console.log('here', menuRef, e.target.parentNode)
    console.log(menuRef.current === e.target.parentNode)
    if(menuRef.current !== e.target.parentNode){
      DropdownContext.hideMenu();
    }
  }
  useEffect(() => {
  //  DropdownContext.hideMenu();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })
  return (
    <DropdownMenuContext.Consumer>
      {({ menuOpen, hasIcons}) => (
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
