import React, { useContext, ReactNode, ReactElement, useEffect, useRef } from 'react';
import { MenuItemStyled } from './style';
import { Icon } from '../../icon';
import { DropdownMenuContext } from './DropdownMenuContext';
import { FCTheme } from '../../../theming/FCTheme';

export interface Props {
  /**
   * @ignore
   */
  children?: ReactNode;
  /** The icon to show beside the button */
  icon?: string;
  /** What should happen when the menu item is clicked */
  onClick?: () => void;
  /**
   * @ignore
   */
  index?: number;
}

const MenuItem = ({ children, icon, index, onClick = (): void => undefined, ...rest }: Props): ReactElement => {
  const { dispatch, dropdownState } = useContext(DropdownMenuContext);
  const isMounted = useRef(true);
  const theme = useContext(FCTheme);

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
      theme={theme.theme}
      tabIndex={-1}
      aria-selected={dropdownState.selectedItemIndex === index ? true : false}
      onMouseOver={() => {
        dispatch({ type: 'SET_SELECTED_ITEM_INDEX', payload: index });
        dispatch({
          type: 'SET_ACTIVE_DESCENDANT',
          payload: `${dropdownState.id}_menuitem_${index}`,
        });
      }}
      onClick={(): void => {
        dispatch({ type: 'SET_MENU_OPEN', payload: false });
        setTimeout(() => {
          dispatch({ type: 'SET_MENU_VISIBLE', payload: false });
        }, 200);
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

export default MenuItem;
