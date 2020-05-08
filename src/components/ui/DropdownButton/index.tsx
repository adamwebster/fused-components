import React, { useState, useRef, useContext, ReactElement, ReactNode } from 'react';
import { DropdownButtonWrapper, MenuDivider } from './style';
import { DropdownMenu } from './DropdownMenu';
import { MenuItem } from './MenuItem';
import { DropdownMenuProvider } from './DropdownMenuContext';
import { fcStyles } from '../../../common/types';
import { FCTheme } from '../../../theming/FCTheme';
import DropdownButtonButton from './DropdownButtonButton';

export interface Props {
  /** Set the button to be primary */
  primary?: boolean;
  /** Set the text for the button */
  label: any;
  /** Set the style of the button */
  fcStyle?: fcStyles;
  /** Set the color of the button */
  buttonColor?: string;
  children: ReactNode;
  /** Set what element the button should be rended as for example as="a" */
  as?: string;
}
export const DropdownButton = ({ primary, label, fcStyle, children, buttonColor, as }: Props): ReactElement => {
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonEl = useRef<HTMLButtonElement>(null);
  const theme = useContext(FCTheme);
  const hideMenuFunc = (isMounted: boolean): void => {
    if (menuOpen && isMounted) {
      setMenuOpen(false);
      setTimeout(() => {
        //      setMenuVisible(false);
      }, 200);
    }
  };

  const state = {
    menuOpen,
    menuVisible: false,
    hideMenu: (isMounted: boolean): void => hideMenuFunc(isMounted),
    buttonEl,
    theme: theme.theme,
    primary,
    label,
    fcStyle,
    buttonColor,
    as,
  };

  return (
    <DropdownButtonWrapper renderAs={as}>
      <DropdownMenuProvider state={state}>
        <DropdownButtonButton />
        {children}
      </DropdownMenuProvider>
    </DropdownButtonWrapper>
  );
};

const MenuDividerComponent = () => {
  return (
    <li>
      <MenuDivider />
    </li>
  );
};
DropdownButton.Menu = DropdownMenu;
DropdownButton.MenuItem = MenuItem;
DropdownButton.Divider = MenuDividerComponent;
