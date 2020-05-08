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
      isMounted.current = false;
    };
  }, []);

  return (
    <MenuItemStyled
      ref={menuItem}
      id={`${dropdownState.id}_menuitem_${index}`}
      theme={dropdownState?.theme}
      tabIndex={-1}
      aria-selected={dropdownState.selectedItemIndex === index ? true : false}
      onMouseOver={() => dispatch({ type: 'SET_SELECTED_ITEM_INDEX', payload: index })}
      onClick={(): void => {
        dispatch({ type: 'SET_MENU_OPEN', payload: false });
        setTimeout(() => {
          dispatch({ type: 'SET_MENU_VISIBLE', payload: false });
        }, 400);
        onClick();
      }}
      role="menuitem"
      {...rest}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </MenuItemStyled>
  );
};
