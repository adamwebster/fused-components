import React, { ReactElement } from 'react';
import { StyledHeading } from './style';

export const Heading = ({ ...rest }): ReactElement => {
  return <StyledHeading {...rest} />;
};
