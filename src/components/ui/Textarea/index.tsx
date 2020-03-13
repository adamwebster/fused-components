import React, { useContext } from 'react';
import { StyledTextarea } from './styles';
import { FCTheme } from '../../../theming/FCTheme';

export const Textarea = ({ ...rest }) => {
  const theme = useContext(FCTheme);

  return <StyledTextarea theme={theme?.theme} {...rest} />;
};
