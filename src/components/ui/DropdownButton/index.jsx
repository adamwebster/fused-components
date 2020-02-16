import React, { useState, useRef } from "react";
import { Button } from "../Button";

import { DropdownButtonWrapper, IconStyled, MenuDivider } from "./style";
import { DropdownMenu } from "./DropdownMenu";
import { MenuItem } from "./MenuItem";
import DropdownMenuContext from "./DropdownMenuContext";
import Icon from "../../icon";

var ref = null;
export const DropdownButton = ({
  primary,
  hasIcons,
  label,
  fcStyle,
  children
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuEl = useRef(null);

  const hideMenuFunc = () => {
    setMenuVisible(false);
    setMenuOpen(false);

    console.log("hideMenu");
  };
  const state = {
    menuOpen,
    hasIcons,
    hideMenu: () => hideMenuFunc()
  };

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(() => {
        setMenuVisible(false);
      }, 200);
    } else {
      setMenuVisible(true);
      setMenuOpen(true);
    }
  };

  return (
    <DropdownButtonWrapper>
      <DropdownMenuContext.Provider value={state}>
        <Button
          fcStyle={fcStyle}
          primary={primary}
          onClick={() => toggleMenu()}
        >
          {label}
          {menuOpen ? (
            <IconStyled>
              <Icon icon="caret-up" />
            </IconStyled>
          ) : (
            <IconStyled>
              <Icon icon="caret-down" />
            </IconStyled>
          )}
        </Button>
        {menuVisible && children}
      </DropdownMenuContext.Provider>
    </DropdownButtonWrapper>
  );
};

DropdownButton.Menu = DropdownMenu;
DropdownButton.MenuItem = MenuItem;
DropdownButton.Divider = MenuDivider;
