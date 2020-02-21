import React, { ReactNode } from "react";
import { Icon } from "../../icon";
import { StyledAlert, Title, AlertContent } from "./style";
import { fcStyles } from "../../../common/types";

export interface Props {
  /** Sets the style of the alert */
  fcStyle?: fcStyles,
  /** Sets the title for the alert */
  title?: string,
  /** Sets the icon for the alert */
  icon?: string
  /** Sets the border radius for the alert */
  borderRadius?: string,
  children?: ReactNode,
}
export const Alert = ({
  fcStyle,
  title,
  icon,
  borderRadius = '5px',
  children,
  ...rest }:Props) => {
  return (
    <StyledAlert borderRadius={borderRadius} fcStyle={fcStyle} {...rest}>
      {title && (
        <h4>
          {icon && <Icon icon={icon} />} <Title>{title}</Title>
        </h4>
      )}
      {children && <AlertContent>{children}</AlertContent>}
    </StyledAlert>
  );
};
