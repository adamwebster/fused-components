import React, { ReactNode } from "react";
import { Label, IconStyled, CheckInput } from "./style";
import { Icon } from '../../icon/';

export interface Props extends React.HTMLProps<HTMLInputElement> {
  children?: ReactNode,
  /** Set to true if the checkbox is checked */
  checked?: boolean,
  /** Set the checkbox to be in its error state */
  inError?: boolean,
  /** Set the checkbox to be in its warning state */
  inWarning?: boolean,
}

const CheckboxInput = ({checked = false, ...rest }) => {
  return(
  <CheckInput checked={checked} {...rest} />
  )
}
export const Checkbox = ({ children, checked = false, inError = false, inWarning = false, ...rest }: Props) => {
  return (
    <label>
      <CheckboxInput checked={checked} {...rest} />
      {checked ? <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="checkbox-checked" /></IconStyled> : <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="checkbox" /></IconStyled>}
      <Label inError={inError} inWarning={inWarning}>{children}</Label>
    </label>
  );
};
