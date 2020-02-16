import React from "react";

import { MenuItemStyled } from "./style";
import Icon from "../../icon";

export const MenuItem = ({ children, icon, ...rest }) => {
  return <MenuItemStyled {...rest}>
  {icon && <Icon icon={icon} />}
  {children} </MenuItemStyled>;
};
