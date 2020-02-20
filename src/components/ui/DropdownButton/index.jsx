import React, { useState, useRef } from "react";
import { Button } from "../Button";
import PropTypes from "prop-types";
import { DropdownButtonWrapper, IconStyled, MenuDivider } from "./style";
import { DropdownMenu } from "./DropdownMenu";
import { MenuItem } from "./MenuItem";
import DropdownMenuContext from "./DropdownMenuContext";
import { Icon } from "../../icon";

export const DropdownButton = ({
  primary,
  label,
  fcStyle,
  children,
  as
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const buttonEl = useRef(null);

  const hideMenuFunc = () => {
    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(() => {
        setMenuVisible(false);
      }, 200);
    }
  };
  const state = {
    menuOpen,
    hideMenu: () => hideMenuFunc(),
    buttonEl,
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
    <DropdownButtonWrapper
    renderAs={as}
    >
      <DropdownMenuContext.Provider value={state}>
        <Button
          buttonRef={buttonEl}
          fcStyle={fcStyle}
          primary={primary}
          onClick={() => toggleMenu()}
          as={as}

        >
          {label}
          {menuOpen ? (
            <IconStyled renderAs={as}>
              <Icon icon="caret-up" />
            </IconStyled>
          ) : (
            <IconStyled renderAs={as}>
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

DropdownButton.propTypes = {
  primary: PropTypes.bool,
  label: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  /** Danger | Warning | Info | Success */
  fcStyle: PropTypes.string
}
