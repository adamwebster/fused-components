import React from "react";
import { Icon } from "../../icon";
import { StyledAlert, Title, AlertContent } from "./style";

export interface Props {
  fcStyle?: string,
  title?: string,
  icon?: string
  borderRadius?: string,
  children?: any
}
export const Alert = ({
  fcStyle,
  title,
  icon,
  borderRadius,
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
