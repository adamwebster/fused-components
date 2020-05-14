import React, { useContext, ReactElement, ReactNode, HTMLAttributes } from 'react';
import { DropdownButtonWrapper, MenuDivider } from './style';
import { DropdownMenu } from './DropdownMenu';
import MenuItem from './MenuItem';
import { DropdownMenuProvider } from './DropdownMenuContext';
import { fcStyles } from '../../../common/types';
import { FCTheme } from '../../../theming/FCTheme';
import DropdownButtonButton from './DropdownButtonButton';
import DropdownButtonChildren from './DropdownButtonChildren';
import { Placement as PopperPlacements } from '@popperjs/core';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  /** The id of the element. Required for accessibility.  */
  id: string;
  /** Set the button to be primary */
  primary?: boolean;
  /** Set the text for the button */
  label: any;
  /** Set the style of the button */
  fcStyle?: fcStyles;
  /** Set the color of the button */
  buttonColor?: string;
  /** The placement of the dropdown menu. "auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" */
  placement?: PopperPlacements;
  /**
   * @ignore
   */
  children: ReactNode;
  /** Set what element the button should be rended as for example as="a" */
  as?: string;
}
export const DropdownButton = ({
  primary,
  label,
  fcStyle,
  children,
  buttonColor,
  as,
  id,
  placement = 'bottom-start',
  ...rest
}: Props): ReactElement => {
  const theme = useContext(FCTheme);
  const state = {
    menuOpen: false,
    menuVisible: false,
    theme,
    as,
    id,
    menuRef: null,
    selectedItemIndex: 0,
    activeDescendant: `${id}_menuitem_0`,
    placement,
  };

  return (
    <DropdownButtonWrapper renderAs={as}>
      <DropdownMenuProvider state={state}>
        <DropdownButtonButton buttonColor={buttonColor} label={label} primary={primary} fcStyle={fcStyle} {...rest} />
        <DropdownButtonChildren>{children}</DropdownButtonChildren>
      </DropdownMenuProvider>
    </DropdownButtonWrapper>
  );
};

const MenuDividerComponent = () => {
  return (
    <li aria-hidden role="presentation">
      <MenuDivider />
    </li>
  );
};
DropdownButton.Menu = DropdownMenu;
DropdownButton.MenuItem = MenuItem;
DropdownButton.Divider = MenuDividerComponent;
