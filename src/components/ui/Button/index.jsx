import React from 'react';
import { StyledButton } from './style';
import PropTypes from 'prop-types';

export const Button = ({ buttonColor, disabled, isLoading, buttonRef, loadingIcon, icon, children, ...rest }) => {
  return (
    <StyledButton ref={buttonRef} icon={icon} buttonColor={buttonColor} disabled={disabled || isLoading} {...rest}>
      {(isLoading && loadingIcon) && <>{loadingIcon} </>}
      {(icon && !isLoading) && <span className="button-icon">{icon} </span>}
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  /** Sets the button to be a primary */
  primary: PropTypes.bool,
  /** Sets the button color */
  buttonColor: PropTypes.string,
  /** Sets if the button is loading. Should also set the loading icon */
  isLoading: PropTypes.bool,
  /** Sets the icon for the loading state of the button */
  loadingIcon: PropTypes.object,
  /** Sets an icon for the button */
  icon: PropTypes.object,
}
