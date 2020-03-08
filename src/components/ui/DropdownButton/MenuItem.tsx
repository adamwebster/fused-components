import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MenuItemStyled } from "./style";
import { Icon } from "../../icon";
import { DropdownMenuContext } from "./DropdownMenuContext";

export interface Props {
  children?: any,
  icon?: string,
  onClick?: () => void
}
export const MenuItem = ({ children, icon, onClick = () => {}, ...rest }:Props) => {
  const DropdownContext = useContext(DropdownMenuContext);

  return (
    <MenuItemStyled theme={DropdownContext?.theme} onClick={() => {if(DropdownContext){DropdownContext.hideMenu()}; onClick();}} {...rest}>
      {icon && <Icon icon={icon} />}
      {children}
    </MenuItemStyled>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

MenuItem.defaultProps = {
  onClick: () => {},
}
