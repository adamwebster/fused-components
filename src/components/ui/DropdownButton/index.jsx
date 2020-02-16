import React, { useState } from "react";
import { Button } from "../Button";

import { DropdownButtonWrapper , IconStyled } from "./style";
import { DropdownMenu } from "./DropdownMenu";
import { MenuItem } from "./MenuItem";
import DropdownMenuContext from "./DropdownMenuContext";
import Icon from '../../icon';

export const DropdownButton = ({ primary, label, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const state = {
        menuOpen
      };

  const toggleMenu= () => {
    if(menuOpen){
        setMenuOpen(false);
        setTimeout(() => {
            setMenuVisible(false);
        }, 500)
     }else{
         setMenuVisible(true);
        setMenuOpen(true);
     }
    }

  return (
    <DropdownButtonWrapper>
      <DropdownMenuContext.Provider value={state}>
        <Button primary={primary} onClick={() => toggleMenu()}>
          {label}
          {menuOpen ? <IconStyled><Icon icon='caret-up'/></IconStyled> :<IconStyled><Icon icon='caret-down'/></IconStyled>}
        </Button>
        {menuVisible && children}
      </DropdownMenuContext.Provider>
    </DropdownButtonWrapper>
  );
};

DropdownButton.Menu = DropdownMenu;
DropdownButton.MenuItem = MenuItem;
