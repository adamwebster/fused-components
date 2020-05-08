import React, { useContext } from 'react';
import { Button } from '../Button';
import { Icon } from '../../icon';
import { IconStyled } from './style';
import { DropdownMenuContext } from './DropdownMenuContext';

const DropdownButtonButton = () => {
  const { state, dispatch } = useContext(DropdownMenuContext);
  const toggleMenu = (): void => {
    console.log(dispatch, state);
    if (state.menuOpen) {
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
      ref={state.buttonEl}
      fcStyle={state.fcStyle}
      primary={state.primary}
      onClick={(): void => toggleMenu()}
      as={state.as}
      buttonColor={state.buttonColor}
    >
      {console.log(state.menuOpen)}
      {state.label}
      {state.menuOpen ? (
        <IconStyled renderAs={state.as}>
          <Icon icon="caret-up" />
        </IconStyled>
      ) : (
        <IconStyled renderAs={state.as}>
          <Icon icon="caret-down" />
        </IconStyled>
      )}
    </Button>
  );
};

export default DropdownButtonButton;
