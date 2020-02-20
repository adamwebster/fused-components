import React from "react";
import { Label, IconStyled, RadioInput } from "./style";
import { Icon } from '../../icon';

export interface Props {
  children :any,
  checked: boolean,
  inWarning: boolean,
  inError: boolean,
}
export const Radio = ({ children, checked = false, inWarning = false, inError = false, ...radioProps }:Props) => {
  return (
    <label>
      <RadioInput inError={inError} inWarning={inWarning} type="radio" {...radioProps} />
      {checked ? <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="radio-checked"/></IconStyled> : <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="radio"/></IconStyled> }
      <Label inError={inError} inWarning={inWarning}>{children}</Label>
    </label>
  );
};