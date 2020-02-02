import React from 'react';
import PropTypes from 'prop-types';
import { StyledAlert } from './style';

export const Alert = ({ fcStyle, borderRadius, ...rest }) => {
  return (
    <StyledAlert borderRadius={borderRadius} fcStyle={fcStyle} {...rest} />
  );
}

Alert.defaultProps = { 
  borderRadius: false,
}

Alert.propTypes = {
  /** danger | warning | info | success */
  fcStyle: PropTypes.string,
  /** if set to true will add a border radius of 5px to the alert */
  borderRadius: PropTypes.bool,
}
