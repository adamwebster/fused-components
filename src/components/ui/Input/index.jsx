import React from 'react';
import { StyledInput } from './style';
import PropTypes from 'prop-types';

const Input = ({ariaLabel, ...rest }) => {
  return (
    <StyledInput aria-label={ariaLabel} {...rest} />
  );
}

Input.defaultProps = {
}
Input.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
}



export default Input;