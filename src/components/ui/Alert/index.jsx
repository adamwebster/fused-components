import React from 'react';
import PropTypes from 'prop-types';
import { StyledAlert } from './style';

const Alert = ({ fcStyle, borderRadius, ...rest }) => {
  return (
    <StyledAlert borderRadius={borderRadius} fcStyle={fcStyle} {...rest} />
  );
}

Alert.defaultProps = { 
  borderRadius: '5px',
}

Alert.propTypes = {
  fcStyle: PropTypes.string,
  borderRadius: PropTypes.string,
}
export default Alert;