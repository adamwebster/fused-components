import React from "react";
import { StyledButton } from "./style";

export interface Props {
  /** Sets the button to be a primary button */
  primary?: boolean,
  buttonColor?: string,
  disabled?: boolean,
  isLoading?: boolean,
  buttonRef?: any,
  loadingIcon?: object,
  icon?: object,
  children?: any,
}

export const Button = ({buttonColor, disabled = false, isLoading = false, buttonRef, loadingIcon, icon, children, ...rest}:Props ) => {
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
