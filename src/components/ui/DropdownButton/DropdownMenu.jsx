import React from "react";

import { DropdownMenuStyled } from "./style";
import DropdownMenuContext from "./DropdownMenuContext";

export const DropdownMenu = ({ children }) => {
  return (
    <DropdownMenuContext.Consumer>
      {({ menuOpen }) => (
        <>
        <DropdownMenuStyled menuOpen={menuOpen}>{children}</DropdownMenuStyled>
      </>
      )}
    </DropdownMenuContext.Consumer>
  );
};
