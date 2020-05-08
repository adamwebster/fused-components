import React, { useContext } from 'react';
import { Button } from '../Button';
import { Icon } from '../../icon';
import { IconStyled } from './style';
import { DropdownMenuContext } from './DropdownMenuContext';

const DropdownButtonButton = () => {
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

  return (
    <Button
      ref={dropdownState.buttonEl}
      fcStyle={dropdownState.fcStyle}
      primary={dropdownState.primary}
      onClick={(): void => toggleMenu()}
      as={dropdownState.as}
      buttonColor={dropdownState.buttonColor}
    >
      {dropdownState.label}
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
