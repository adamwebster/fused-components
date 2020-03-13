import React, { useState, useRef, useContext } from 'react';
import { Button } from '../Button';
import { DropdownButtonWrapper, IconStyled, MenuDivider } from './style';
import { DropdownMenu } from './DropdownMenu';
import { MenuItem } from './MenuItem';
import { DropdownMenuProvider } from './DropdownMenuContext';
import { Icon } from '../../icon';
import { fcStyles } from '../../../common/types';
import { FCTheme } from '../../../theming/FCTheme';

export interface Props {
  /** Set the button to be primary */
  primary?: boolean;
  /** Set the text for the button */
  label: string;
  /** Set the style of the button */
  fcStyle?: fcStyles;
  /** Set the color of the button */
  buttonColor?: string;
  children: any;
  /** Set what element the button should be rended as for example as="a" */
  as?: any;
}
export const DropdownButton = ({ primary, label, fcStyle, children, buttonColor, as }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const buttonEl = useRef();
  const theme = useContext(FCTheme);
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
    theme: theme?.theme,
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
    <DropdownButtonWrapper renderAs={as}>
      <DropdownMenuProvider value={state}>
        <Button
          buttonRef={buttonEl}
          fcStyle={fcStyle}
          primary={primary}
          onClick={() => toggleMenu()}
          as={as}
          buttonColor={buttonColor}
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
      </DropdownMenuProvider>
    </DropdownButtonWrapper>
  );
};

DropdownButton.Menu = DropdownMenu;
DropdownButton.MenuItem = MenuItem;
DropdownButton.Divider = MenuDivider;
