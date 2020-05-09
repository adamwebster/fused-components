import React, { useContext } from 'react';
import { Button } from '../Button';
import { Icon } from '../../icon';
import { IconStyled } from './style';
import { DropdownMenuContext } from './DropdownMenuContext';
import { fcStyles } from '../../../common/types';

interface Props {
  fcStyle?: fcStyles;
  label?: string;
  primary?: boolean;
  buttonColor?: string;
}
const DropdownButtonButton = ({ fcStyle, label, buttonColor, primary }: Props) => {
  const { dropdownState, dispatch } = useContext(DropdownMenuContext);
  const toggleMenu = (): void => {
    if (dropdownState.menuOpen) {
      dispatch({ type: 'SET_MENU_OPEN', payload: false });
      setTimeout(() => {
        dispatch({ type: 'SET_MENU_VISIBLE', payload: false });
        dispatch({ type: 'SET_SELECTED_ITEM_INDEX', payload: 0 });
      }, 200);
    } else {
      dispatch({ type: 'SET_MENU_VISIBLE', payload: true });
      dispatch({ type: 'SET_MENU_OPEN', payload: true });
    }
  };

  const handleButtonKeyDown = (e: any) => {
    switch (e.key) {
      case 'ArrowDown':
        if (!dropdownState.menuOpen) {
          return toggleMenu();
        }
      case 'Enter':
        e.preventDefault();
        return toggleMenu();
      default:
        return false;
    }
  };

  let ariaProps = {};

  if (dropdownState.menuOpen) {
    ariaProps = {
      ...ariaProps,
      'aria-expanded': true,
    };
  }
  return (
    <Button
      id={dropdownState.id}
      tabIndex={0}
      aria-haspopup={true}
      aria-controls={`${dropdownState.id}-menu`}
      {...ariaProps}
      ref={dropdownState.buttonEl}
      fcStyle={fcStyle}
      primary={primary}
      onClick={(): void => toggleMenu()}
      as={dropdownState.as}
      buttonColor={buttonColor}
      onKeyDown={(e: any) => handleButtonKeyDown(e)}
    >
      {label}
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
