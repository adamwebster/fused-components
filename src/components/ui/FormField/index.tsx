import React, { useContext, ReactElement, ReactNode } from 'react';
import { Label } from '../Label';
import { HintText, RequiredMark, ValidationMessage, InputWrapper, FormFieldWrapper } from './style';
import { FCTheme } from '../../../theming/FCTheme';

export interface Props {
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
  children: ReactNode;
}
export const FormField = ({
  label,
  hint,
  required = false,
  validationMessage,
  htmlFor,
  children,
}: Props): ReactElement => {
  const theme = useContext(FCTheme);

  return (
    <FormFieldWrapper>
      {label && (
        <Label htmlFor={htmlFor}>
          {required && <RequiredMark>* </RequiredMark>}
          {label}
        </Label>
      )}
      <InputWrapper>{children}</InputWrapper>

      {hint && <HintText theme={theme?.theme}>{hint}</HintText>}
      {validationMessage && <ValidationMessage>{validationMessage}</ValidationMessage>}
    </FormFieldWrapper>
  );
};
