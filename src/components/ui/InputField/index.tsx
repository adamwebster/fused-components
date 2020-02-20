import React from "react";

import { Input } from "../Input";
import { Label } from "../Label";
import { HintText,RequiredMark, ValidationMessage } from "./style";

export interface Props {
  label: string,
  hint?: string,
  required?: boolean,
  validationMessage?: string,
  inError?: boolean,
  id?: string,
}
export const InputField = ({ label, hint, required = false, validationMessage, inError = false, id }:Props) => {
  return (
    <>
      <Label htmlFor={id}>
        {required && <RequiredMark>* </RequiredMark>}
        {label}
      </Label>
      <Input inError={inError} id={id} />
      {hint && <HintText>{hint}</HintText>}
      {validationMessage && <ValidationMessage>{validationMessage}</ValidationMessage>}

    </>
  );
};
