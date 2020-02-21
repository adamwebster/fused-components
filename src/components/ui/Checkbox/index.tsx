import React, { ReactNode } from "react";
import { Label, IconStyled, CheckInput } from "./style";
import { Icon } from '../../icon/';

export interface Props {
  children: ReactNode,
  /** Set to true if the checkbox is checked */
  checked?: boolean,
  /** Set the checkbox to be in its error state */
  inError?: boolean,
  /** Set the checkbox to be in its warning state */
  inWarning?: boolean,
  /** What should happen when the radio changes its state.  
   * At a minimum the property check should be set to true 
  */
  onChange?: () => void,
}
export const Checkbox = ({ children, checked = false, inError = false, inWarning = false, ...checkboxProps }: Props) => {
  return (
    <label>
      <CheckInput checked={checked} type="checkbox" {...checkboxProps} />
      {checked ? <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="checkbox-checked" /></IconStyled> : <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="checkbox" /></IconStyled>}
      <Label inError={inError} inWarning={inWarning}>{children}</Label>
    </label>
  );
};
