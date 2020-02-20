import React from "react";
import { StyledInput, InputWrapper, Icon } from "./style";

export interface Props {
  ariaLabel?: string,
  icon?: object,
  inError?: boolean,
  inWarning?: boolean,
  inputRef?: any,
  id?: string,
}
export const Input = ({ ariaLabel, id, inError = false, inputRef, inWarning = false, icon, ...rest }:Props) => {
  return (
    <InputWrapper>
      {icon && <Icon inError={inError} inWarning={inWarning}>{icon}</Icon>}
      <StyledInput id={id} ref={inputRef} icon={icon} inError={inError} inWarning={inWarning} aria-label={ariaLabel} {...rest} />
    </InputWrapper>
  );
};
