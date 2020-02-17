import React from "react";
import PropTypes from "prop-types";
import { MenuItemStyled } from "./style";
import { Icon } from "../../icon";

export const MenuItem = ({ children, icon, ...rest }) => {
  return <MenuItemStyled {...rest}>
  {icon && <Icon icon={icon} />}
  {children} </MenuItemStyled>;
};

MenuItem.propTypes = {
  icon: PropTypes.node,
}
