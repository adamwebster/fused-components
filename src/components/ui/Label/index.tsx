import React, { useContext, ReactElement } from 'react';

import { LabelStyled } from './style';
import { FCTheme } from '../../../theming/FCTheme';

export const Label = ({ ...rest }): ReactElement => {
  const theme = useContext(FCTheme);
  return <LabelStyled theme={theme?.theme} {...rest} />;
};
