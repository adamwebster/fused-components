import React from "react";
import { Label, IconStyled, CheckInput } from "./style";
import { Icon } from '../../icon/';

export interface Props {
  children: Node,
  checked?: Boolean,
  inError?: Boolean,
  inWarning?: boolean,
}
export const Checkbox = ({ children, checked = false, inError = false, inWarning = false, ...checkboxProps }: Props) => {
  return (
    <label>
      <CheckInput checked={checked} type="checkbox" {...checkboxProps} />
      {checked ? <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="checkbox-checked"/></IconStyled> : <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="checkbox"/></IconStyled> }
      <Label inError={inError} inWarning={inWarning}>{children}</Label>
    </label>
  );
};
