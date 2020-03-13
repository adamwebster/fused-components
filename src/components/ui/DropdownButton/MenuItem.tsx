import React, { useContext } from 'react';
import { MenuItemStyled } from './style';
import { Icon } from '../../icon';
import { DropdownMenuContext } from './DropdownMenuContext';

export interface Props {
  children?: any;
  icon?: string;
  onClick?: () => void;
}
export const MenuItem = ({ children, icon, onClick = () => undefined, ...rest }: Props) => {
  const DropdownContext = useContext(DropdownMenuContext);

  return (
    <MenuItemStyled
      theme={DropdownContext?.theme}
      onClick={() => {
        if (DropdownContext) {
          DropdownContext.hideMenu();
        }
        onClick();
      }}
      {...rest}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </MenuItemStyled>
  );
};
