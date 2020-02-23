import React from "react";
import { Label } from "../Label";
import {
  HintText,
  RequiredMark,
  ValidationMessage,
  InputWrapper
} from "./style";

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
  children: any;
}
export const FormField = ({
  label,
  hint,
  required = false,
  validationMessage,
  htmlFor,
  children
}: Props) => {
  return (
    <>
      {label && 
        <Label htmlFor={htmlFor}>
          {required && <RequiredMark>* </RequiredMark>}
          {label}
        </Label>
      }
      <InputWrapper>{children}</InputWrapper>

      {hint && <HintText>{hint}</HintText>}
      {validationMessage && (
        <ValidationMessage>{validationMessage}</ValidationMessage>
      )}
    </>
  );
};
