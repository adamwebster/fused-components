import React, { useContext, useEffect, useRef, ReactElement, ReactNode, useCallback } from 'react';
import { DropdownMenuStyled } from './style';
import { DropdownMenuContext } from './DropdownMenuContext';
import { usePopper } from 'react-popper';
import MenuItem from './MenuItem';
import { FCTheme } from '../../../theming/FCTheme';
import { Placement as PopperPlacements } from '@popperjs/core';

export interface Props extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * @ignore
   */
  children: ReactNode;
}

export const DropdownMenu = ({ children, ...rest }: Props): ReactElement => {
  const { dropdownState, dispatch } = useContext(DropdownMenuContext);
  const placement = dropdownState.placement as PopperPlacements;
  const menuRef = useRef<HTMLUListElement>((null as unknown) as HTMLUListElement);
  const theme = useContext(FCTheme);
  const { styles, attributes } = usePopper(dropdownState.buttonEl.current as HTMLElement, menuRef.current, {
    placement,
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });
  // const isMounted = useRef(true);
  // const [itemToFocus, setItemToFocus] = useState(0);
  const handleClickOutside = useCallback(
    (e: MouseEvent): void => {
      const test = (e.target as HTMLElement).parentNode;
      if (
        // Must be some better way to test if the button is being clicked or not
        menuRef.current !== test &&
        dropdownState.buttonEl?.current !== e.target &&
        dropdownState.buttonEl?.current !== test?.parentNode?.parentNode &&
        dropdownState.buttonEl?.current !== test?.parentNode
      ) {
        if (menuRef) {
          dispatch({ type: 'SET_MENU_OPEN', payload: false });
          setTimeout(() => {
            dispatch({ type: 'SET_MENU_VISIBLE', payload: false });
          }, 200);
        }
      }
    },
    [dropdownState.buttonEl],
  );

  const hideMenu = () => {
    dispatch({ type: 'SET_MENU_OPEN', payload: false });
    setTimeout(() => {
      dispatch({ type: 'SET_MENU_VISIBLE', payload: false });
    }, 200);
  };

  const handleButtonKeyDown = (e: any) => {
    switch (e.key) {
      case 'ArrowDown':
        if (dropdownState.selectedItemIndex !== dropdownState.menuItems.length - 1 && dropdownState.menuOpen) {
          e.preventDefault();
          dispatch({
            type: 'SET_ACTIVE_DESCENDANT',
            payload: `${dropdownState.id}_menuitem_${dropdownState.selectedItemIndex + 1}`,
          });
          dispatch({ type: 'INCREASE_SELECTED_ITEM_INDEX' });
          return;
        }
        return;
      case 'ArrowUp':
        if (dropdownState.selectedItemIndex !== 0 && dropdownState.menuOpen) {
          e.preventDefault();
          dispatch({
            type: 'SET_ACTIVE_DESCENDANT',
            payload: `${dropdownState.id}_menuitem_${dropdownState.selectedItemIndex - 1}`,
          });
          dispatch({ type: 'DECREASE_SELECTED_ITEM_INDEX' });
          return;
        } else {
          return;
        }
      case 'Enter':
        e.preventDefault();
        if (dropdownState.menuItems[dropdownState.selectedItemIndex].props.onClick) {
          dropdownState.menuItems[dropdownState.selectedItemIndex].props.onClick();
          hideMenu();
          return;
        }
      case 'Escape':
        dropdownState.buttonEl.current.focus();
        hideMenu();
        return;
      case 'Tab':
        hideMenu();
    }
  };

  const childrenArray = React.Children.toArray(children).filter((child: any) => {
    return child;
  });

  const childrenArrayMenuItems = React.Children.toArray(children).filter((child: any) => {
    return child.type === MenuItem;
  });

  useEffect(() => {
    menuRef.current.focus();

    dispatch({ type: 'SET__MENU_REF', payload: menuRef });
    dispatch({ type: 'SET_MENU_ITEMS', payload: childrenArrayMenuItems });
    window.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  let itemIndex = 0;

  const ariaProps = {
    'aria-activedescendant': dropdownState.activeDescendant,
  };

  return (
    <>
      {dropdownState.menuVisible && (
        <DropdownMenuStyled
          aria-labelledby={dropdownState.id}
          id={`${dropdownState.id}-menu`}
          role="menu"
          {...ariaProps}
          ref={menuRef}
          theme={theme.theme}
          menuOpen={dropdownState.menuOpen}
          tabIndex={0}
          onKeyDown={(e: any) => handleButtonKeyDown(e)}
          style={styles.popper}
          {...attributes.popper}
          {...rest}
        >
          {childrenArray.map((child: any) => {
            if (child.type === MenuItem) {
              const menuItem = (
                <MenuItem key={child.key} index={itemIndex} {...child.props}>
                  {child.props.children}
                </MenuItem>
              );
              itemIndex += 1;
              return menuItem;
            } else {
              return child;
            }
          })}
        </DropdownMenuStyled>
      )}
    </>
  );
};
