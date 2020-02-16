import React from "react";

import { Input } from "../Input";
import { Label } from "../Label";
import { HintText,RequiredMark, ValidationMessage } from "./style";

export const InputField = ({ label, hint, required, validationMessage, inError, id }) => {
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
