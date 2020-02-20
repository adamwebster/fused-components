import React from "react";
import { StyledButton, StyledIcon } from "./style";
import { Icon } from "../../icon";

export interface Props {
  /** Sets the button to be a primary button */
  primary?: boolean,
  /** Set the style of the button */
  fcStyle?: 'danger' | 'warning' | 'info' | 'success',
  /** Set the color of the button */
  buttonColor?: string,
  /** Set the button to be disabled */
  disabled?: boolean,
  /** Set the button to be in its loading state */
  isLoading?: boolean,
  /** Set an ref for the button */
  buttonRef?: any,
  /** Set the loading icon */
  loadingIcon?: object,
  /** Set the icon for the button */
  icon?: string,
  children?: any,
  /** Set the click function for the button */
  onClick?: (e: any) => void,
  /** What the button should be rendered as for example as="a" */
  as?: any
}

export const Button = ({buttonColor, disabled = false, isLoading = false, buttonRef, primary, loadingIcon, icon, children, fcStyle, ...rest}:Props ) => {
  return (
    <StyledButton
      ref={buttonRef}
      icon={icon}
      buttonColor={buttonColor}
      disabled={disabled || isLoading}
      primary={primary}
      fcStyle={fcStyle}
      {...rest}
    >
      {isLoading && loadingIcon && <>{loadingIcon} </>}
      {icon && !isLoading && <StyledIcon primary={primary}><Icon icon={icon} /></StyledIcon>}
      {children}
    </StyledButton>
  );
};
