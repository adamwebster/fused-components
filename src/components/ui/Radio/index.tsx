import React, { ReactNode } from "react";
import { Label, IconStyled, RadioInput } from "./style";
import { Icon } from "../../icon";

export interface Props extends React.HTMLProps<HTMLInputElement> {
  children: ReactNode,
  /** If the radio is checked */
  checked?: boolean,
  /** If the radio is in its warning state */
  inWarning?: boolean,
  /** If the radio is in its error state */
  inError?: boolean,
  /** The function that is called when the input changes between selected and not selected */
  onChange?: (e:any) => void,
  /** The value of the input */
  value?: string
}
export const Radio = ({
  children,
  checked = false,
  inWarning = false,
  inError = false,
  value,
  onChange = (e) => {},
  ...rest
}: Props) => {
  return (
    <label>
      <RadioInput value={value} type="radio" checked={checked} onChange={(e: any) => onChange(e)} />
      {checked ? (
        <IconStyled inError={inError} inWarning={inWarning}>
          {" "}
          <Icon icon="radio-checked" />
        </IconStyled>
      ) : (
        <IconStyled inError={inError} inWarning={inWarning}>
          {" "}
          <Icon icon="radio" />
        </IconStyled>
      )}
      <Label inError={inError} inWarning={inWarning}>
        {children}
      </Label>
    </label>
  );
};
