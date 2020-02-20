import React from "react";
import { StyledButton } from "./style";

export interface Props {
  /** Sets the button to be a primary button */
  primary?: Boolean,
  fcStyle?: String,
  buttonColor?: String,
  disabled?: Boolean,
  isLoading?: Boolean,
  buttonRef?: any,
  loadingIcon?: Object,
  icon?: Object,
  children?: any,
  onClick?: Function,
  as: any
}

export const Button = ({buttonColor, disabled = false, isLoading = false, buttonRef, loadingIcon, icon, children, fcStyle, ...rest}:Props ) => {
  return (
    <StyledButton
      ref={buttonRef}
      icon={icon}
      buttonColor={buttonColor}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && loadingIcon && <>{loadingIcon} </>}
      {icon && !isLoading && <span className="button-icon">{icon} </span>}
      {children}
    </StyledButton>
  );
};
