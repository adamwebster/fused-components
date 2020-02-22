import React, { ReactNode } from "react";
import { Label, IconStyled, RadioInput } from "./style";
import { Icon } from "../../icon";

export interface Props extends React.HTMLProps<HTMLInputElement> {
  children: ReactNode;
  /** If the radio is checked */
  checked?: boolean;
  /** If the radio is in its warning state */
  inWarning?: boolean;
  /** If the radio is in its error state */
  inError?: boolean;
}
export const Radio = ({
  children,
  checked = false,
  inWarning = false,
  inError = false,
  ...rest
}: Props) => {
  return (
    <label>
      <RadioInput type="radio" checked={checked} />
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
