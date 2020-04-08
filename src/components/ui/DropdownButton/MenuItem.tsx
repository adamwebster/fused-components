import React, { useContext, ReactNode, ReactElement } from 'react';
import { MenuItemStyled } from './style';
import { Icon } from '../../icon';
import { DropdownMenuContext } from './DropdownMenuContext';

export interface Props {
  children?: ReactNode;
  icon?: string;
  onClick?: () => void;
}
export const MenuItem = ({ children, icon, onClick = (): void => undefined, ...rest }: Props): ReactElement => {
  const DropdownContext = useContext(DropdownMenuContext);

  return (
    <MenuItemStyled
      theme={DropdownContext?.theme}
      onClick={(): void => {
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
