import React, { useContext, forwardRef } from 'react';
import { StyledTextarea } from './styles';
import { FCTheme } from '../../../theming/FCTheme';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The id of the element. Required for accessibility.  */
  id: string;
  /** Set if the input is in error */
  inError?: boolean;
}
const Textarea = forwardRef<HTMLTextAreaElement, Props>((props: Props, ref) => {
  const { id, inError, ...rest } = props;
  const theme = useContext(FCTheme);
  return <StyledTextarea inError={inError} id={id} ref={ref} theme={theme.theme} {...rest} />;
});

Textarea.displayName = 'Textarea';
export default Textarea;
