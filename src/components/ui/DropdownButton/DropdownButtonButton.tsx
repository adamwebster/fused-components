import React, { useContext, useRef, useEffect } from 'react';
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
  const buttonRef = useRef<HTMLButtonElement | null>(null);
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
          toggleMenu();
          return;
        }
      case 'Enter':
        e.preventDefault();
        toggleMenu();
        return;
    }
  };

  let ariaProps = {};

  if (dropdownState.menuOpen) {
    ariaProps = {
      ...ariaProps,
      'aria-expanded': true,
      'aria-controls': `${dropdownState.id}-menu`,
    };
  }
  useEffect(() => {
    dispatch({ type: 'SET_BUTTON_REF', payload: buttonRef });
  }, [buttonRef]);
  return (
    <Button
      id={dropdownState.id}
      tabIndex={0}
      aria-haspopup={true}
      {...ariaProps}
      ref={buttonRef}
      fcStyle={fcStyle}
      primary={primary}
      onClick={(): void => toggleMenu()}
      as={dropdownState.as}
      buttonColor={buttonColor}
      onKeyDown={(e: any) => handleButtonKeyDown(e)}
    >
      {label}
      <IconStyled renderAs={dropdownState.as}>
        <Icon
          title={dropdownState.menuOpen ? 'Menu open' : 'Menu closed'}
          icon={dropdownState.menuOpen ? 'caret-up' : 'caret-down'}
        />
      </IconStyled>
    </Button>
  );
};

export default DropdownButtonButton;
