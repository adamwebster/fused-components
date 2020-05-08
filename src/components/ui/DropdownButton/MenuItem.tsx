import React, { useContext, ReactNode, ReactElement, useEffect, useRef } from 'react';
import { MenuItemStyled } from './style';
import { Icon } from '../../icon';
import { DropdownMenuContext } from './DropdownMenuContext';

export interface Props {
  children?: ReactNode;
  icon?: string;
  onClick?: () => void;
  index?: number;
}
export const MenuItem = ({ children, icon, index, onClick = (): void => undefined, ...rest }: Props): ReactElement => {
  const { dispatch, dropdownState } = useContext(DropdownMenuContext);
  const isMounted = useRef(true);
  const menuItem = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    return () => {
      console.log(menuItem);
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    console.log(dropdownState.menuRef);
  }, [menuItem]);

  return (
    <MenuItemStyled
      ref={menuItem}
      theme={dropdownState?.theme}
      aria-selected={dropdownState.selectedItemIndex === index ? true : false}
      onClick={(): void => {
        dispatch({ type: 'SET_MENU_OPEN', payload: false });
        setTimeout(() => {
          dispatch({ type: 'SET_MENU_VISIBLE', payload: false });
        }, 400);
        onClick();
      }}
      role="button"
      {...rest}
    >
      {icon && <Icon icon={icon} />}
      {index}
      {dropdownState.selectedItemIndex} {children}
    </MenuItemStyled>
  );
};
