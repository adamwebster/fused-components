import React, { useContext, ReactElement } from 'react';
import { StyledTextarea } from './styles';
import { FCTheme } from '../../../theming/FCTheme';

export const Textarea = ({ ...rest }): ReactElement => {
  const theme = useContext(FCTheme);

  return <StyledTextarea theme={theme?.theme} {...rest} />;
};
