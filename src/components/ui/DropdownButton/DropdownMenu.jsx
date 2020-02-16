import React  from "react";

import { DropdownMenuStyled } from "./style";
import DropdownMenuContext from "./DropdownMenuContext";

export const DropdownMenu = ({ children, context, props }) => {
  return (
    <DropdownMenuContext.Consumer>
      {({ menuOpen, hasIcons}) => (
        <>
          <DropdownMenuStyled
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
