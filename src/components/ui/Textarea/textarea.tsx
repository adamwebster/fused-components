import React, { useContext, ReactElement, TextareaHTMLAttributes } from 'react';
import { StyledTextarea } from './styles';
import { FCTheme } from '../../../theming/FCTheme';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The id of the element. Required for accessibility.  */
  id: string;
}
const Textarea = ({ id, ...rest }: Props): ReactElement => {
  const theme = useContext(FCTheme);
  return <StyledTextarea id={id} theme={theme.theme} {...rest} />;
};

export default Textarea;
