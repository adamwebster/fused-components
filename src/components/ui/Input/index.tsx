import React from "react";
import { StyledInput, InputWrapper, IconWrapper } from "./style";
import { Icon } from "../../icon";

export interface Props {
  /** Set the aria label for the input */
  ariaLabel?: string,
  /** Set the icon for the input */
  icon?: string,
  /** Set if the input is in error */
  inError?: boolean,
  /** Set if the input is in warning */
  inWarning?: boolean,
  /** The ref for the input */
  inputRef?: any,
  /** The id for the input */
  id?: string,
  /** The value for the input */
  value?: string,
  /** What should happen when the input value changes */
  onChange?: (e: any) => void,
  /** The placeholder for the input */
  placeholder?: string,
  /** Whether the input should be disabled or not */
  disabled?: boolean,
  /** The input type */
  type?: string,
  theme?: any,
}
export const Input = ({ ariaLabel, id, inError = false, inputRef, inWarning = false, icon, ...rest }:Props) => {
  return (
    <InputWrapper>
      {icon && <IconWrapper inError={inError} inWarning={inWarning}><Icon icon={icon} /></IconWrapper>}
      <StyledInput id={id} ref={inputRef} icon={icon} inError={inError} inWarning={inWarning} aria-label={ariaLabel} {...rest} />
    </InputWrapper>
  );
};
