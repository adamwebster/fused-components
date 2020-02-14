import React from 'react';
import { StyledButton } from './style';
import PropTypes from 'prop-types';

export const Button = ({buttonColor, disabled, isLoading, loadingIcon, children, ...rest}) => { 
  return(
    <StyledButton buttonColor={buttonColor} disabled={disabled || isLoading} {...rest}>
      {(isLoading && loadingIcon) && <>{loadingIcon} </>}
      {children}
      </StyledButton>
  )
}

Button.propTypes = {
  primary: PropTypes.bool,
  buttonColor: PropTypes.string,
}
