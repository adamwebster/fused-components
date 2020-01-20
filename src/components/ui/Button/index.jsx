import React from 'react';
import { StyledButton } from './style';

const Button = ({...rest}) => { 
  return(
    <StyledButton {...rest} />
  )
}

export default Button;