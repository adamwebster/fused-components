import React from 'react';

import { StyledAlert } from './style';

const Alert = ({ fcStyle, ...rest }) => {
  return (
    <StyledAlert fcStyle={fcStyle} {...rest} />
  );
}

export default Alert;