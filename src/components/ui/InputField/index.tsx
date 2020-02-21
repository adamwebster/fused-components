import React from "react";

import { Input } from "../Input";
import { Label } from "../Label";
import { HintText,RequiredMark, ValidationMessage } from "./style";

export interface Props {
  /** The label for the input field */
  label: string,
  /** Hint text for the label */
  hint?: string,
  /** if the input is required */
  required?: boolean,
  /** Validation text for the input field */
  validationMessage?: string,
  /** Set the input is in error */
  inError?: boolean,
  /** Set the input to be in warning */
  inWarning?: boolean,
  /** The id for the input */
  id?: string,
}
export const InputField = ({ label, hint, required = false, validationMessage, inError = false, inWarning =false, id }:Props) => {
  return (
    <>
      <Label htmlFor={id}>
        {required && <RequiredMark>* </RequiredMark>}
        {label}
      </Label>
      <Input inWarning={inWarning} inError={inError} id={id} />
      {hint && <HintText>{hint}</HintText>}
      {validationMessage && <ValidationMessage>{validationMessage}</ValidationMessage>}

    </>
  );
};