import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MenuItemStyled } from "./style";
import { Icon } from "../../icon";
import DropdownMenuContext from "./DropdownMenuContext";

export const MenuItem = ({ children, icon, onClick, hasIcons, ...rest }) => {
  const DropdownContext = useContext(DropdownMenuContext);

  return (
    <MenuItemStyled onClick={() => {DropdownContext.hideMenu(); onClick();}} {...rest}>
      {console.log(hasIcons)}
      {icon && <Icon icon={icon} />}
      {children}
    </MenuItemStyled>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.node
};
