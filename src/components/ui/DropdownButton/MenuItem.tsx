import React, { useContext, ReactNode, ReactElement, useEffect, useRef } from 'react';
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
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <MenuItemStyled
      theme={DropdownContext?.theme}
      tabIndex={0}
      onClick={(): void => {
        if (DropdownContext) {
          DropdownContext.hideMenu(isMounted.current);
        }
        onClick();
      }}
      role="button"
      {...rest}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </MenuItemStyled>
  );
};
