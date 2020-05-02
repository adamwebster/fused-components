import React, { useContext, ReactElement, TextareaHTMLAttributes } from 'react';
import { StyledTextarea } from './styles';
import { FCTheme } from '../../../theming/FCTheme';

const Textarea = ({ ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>): ReactElement => {
  const theme = useContext(FCTheme);
  return <StyledTextarea theme={theme.theme} {...rest} />;
};

export default Textarea;
