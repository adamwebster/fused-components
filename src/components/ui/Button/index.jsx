import React from 'react';
import { StyledButton } from './style';
import PropTypes from 'prop-types';

export const Button = ({buttonColor, ...rest}) => { 
  return(
    <StyledButton buttonColor={buttonColor} {...rest} />
  )
}

Button.propTypes = {
  primary: PropTypes.bool,
  buttonColor: PropTypes.string,
}
