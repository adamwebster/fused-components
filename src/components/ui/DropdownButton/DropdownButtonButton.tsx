import React, { useContext } from 'react';
import { Button } from '../Button';
import { Icon } from '../../icon';
import { IconStyled } from './style';
import { DropdownMenuContext } from './DropdownMenuContext';

const DropdownButtonButton = () => {
  console.log('toggle menu');
  const { dropdownState, dispatch } = useContext(DropdownMenuContext);
  const toggleMenu = (): void => {
    if (dropdownState.menuOpen) {
      dispatch({ type: 'SET_MENU_OPEN', payload: false });
      setTimeout(() => {
        dispatch({ type: 'SET_MENU_VISIBLE', payload: false });
      }, 200);
    } else {
      dispatch({ type: 'SET_MENU_VISIBLE', payload: true });
      dispatch({ type: 'SET_MENU_OPEN', payload: true });
    }
  };

  const handleButtonKeyDown = (e: any) => {
    switch (e.key) {
      case 'ArrowDown':
        if (dropdownState.selectedItemIndex !== 2 && dropdownState.menuOpen) {
          e.preventDefault();
          return dispatch({ type: 'INCREASE_SELECTED_ITEM_INDEX' });
        } else {
          toggleMenu();
          return;
        }
      case 'ArrowUp':
        if (dropdownState.selectedItemIndex !== 0 && dropdownState.menuOpen) {
          return dispatch({ type: 'DECREASE_SELECTED_ITEM_INDEX' });
        } else {
          return;
        }
      case 'Enter':
        if (dropdownState.menuOpen) {
          e.preventDefault();
          if (dropdownState.menuItems[dropdownState.selectedItemIndex].props.onClick) {
            dropdownState.menuItems[dropdownState.selectedItemIndex].props.onClick();
          }
        }
      case 'Tab':
        dispatch({ type: 'SET_MENU_VISIBLE', payload: false });
        dispatch({ type: 'SET_MENU_OPEN', payload: false });
      default:
        return false;
    }
  };

  return (
    <Button
      tabIndex={0}
      ref={dropdownState.buttonEl}
      fcStyle={dropdownState.fcStyle}
      primary={dropdownState.primary}
      onMouseDown={(): void => toggleMenu()}
      as={dropdownState.as}
      buttonColor={dropdownState.buttonColor}
      onKeyDown={(e: any) => handleButtonKeyDown(e)}
    >
      {dropdownState.label}
      {dropdownState.selectedItemIndex}
      {dropdownState.menuOpen ? (
        <IconStyled renderAs={dropdownState.as}>
          <Icon icon="caret-up" />
        </IconStyled>
      ) : (
        <IconStyled renderAs={dropdownState.as}>
          <Icon icon="caret-down" />
        </IconStyled>
      )}
    </Button>
  );
};

export default DropdownButtonButton;
