import React from 'react';
import { StyledButton } from './style';
import PropTypes from 'prop-types';

export const Button = ({...rest}) => { 
  return(
    <StyledButton {...rest} />
  )
}

Button.propTypes = {
  primary: PropTypes.bool,
}
