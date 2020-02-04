import React from "react";
import { StyledInput, InputWrapper, Icon } from "./style";
import PropTypes from "prop-types";

export const Input = ({ ariaLabel, inError, inWarning, icon, ...rest }) => {
  return (
    <InputWrapper>
      {icon && <Icon inError={inError} inWarning={inWarning}>{icon}</Icon>}
      <StyledInput icon={icon} inError={inError} inWarning={inWarning} aria-label={ariaLabel} {...rest} />
    </InputWrapper>
  );
};

Input.defaultProps = {
  inError: false,
  inWarning: false,
};

Input.propTypes = {
  ariaLabel: PropTypes.string,
  icon: PropTypes.bool,
  inError: PropTypes.bool,
  inWarning: PropTypes.bool,
};
