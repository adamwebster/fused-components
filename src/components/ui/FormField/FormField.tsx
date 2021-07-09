import React, { useContext, ReactElement, ReactNode } from 'react';
import { Label } from '../Label';
import { HintText, RequiredMark, ValidationMessage, InputWrapper, FormFieldWrapper } from './style';
import { FCTheme } from '../../../theming/FCTheme';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** The label for the input field */
  label?: string;
  /** Hint text for the label */
  hint?: string;
  /** if the input is required */
  required?: boolean;
  /** Validation text for the input field */
  validationMessage?: string;
  /** The htmlFor for the label should match the id of the input */
  htmlFor?: string;
  /**
   * @ignore
   */
  children: ReactNode;
}
export const FormField = ({
  label,
  hint,
  required = false,
  validationMessage,
  htmlFor,
  children,
  ...rest
}: Props): ReactElement => {
  const theme = useContext(FCTheme);

  return (
    <FormFieldWrapper {...rest}>
      {label && (
        <Label htmlFor={htmlFor}>
          {required && <RequiredMark>* </RequiredMark>}
          {label}
        </Label>
      )}
      <InputWrapper>{children}</InputWrapper>

      {hint && (
        <HintText id={`${htmlFor}_hint`} theme={theme.theme}>
          {hint}
        </HintText>
      )}
      {validationMessage && (
        <ValidationMessage theme={theme.theme} role="alert" id={`${htmlFor}_validation_message`}>
          {validationMessage}
        </ValidationMessage>
      )}
    </FormFieldWrapper>
  );
};

FormField.displayName = 'FormField';

export default FormField;
