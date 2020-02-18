import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../../icon";

import { StyledAlert, Title, AlertContent } from "./style";

export const Alert = ({
  fcStyle,
  title,
  icon,
  borderRadius,
  children,
  ...rest
}) => {
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

Alert.defaultProps = {
  borderRadius: false
};

Alert.propTypes = {
  /** danger | warning | info | success */
  fcStyle: PropTypes.string,
  /** if set to true will add a border radius of 5px to the alert */
  borderRadius: PropTypes.bool,
  title: PropTypes.string
};
