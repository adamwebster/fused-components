import React from 'react';
import { StyledInput } from './style';

const Input = ({ ...rest }) => {
  return (
    <StyledInput {...rest} />
  );
}

export default Input;