import React from "react";
import { Label, IconStyled, CheckInput } from "./style";
import PropTypes from "prop-types";
import Icon from '../../icon/';

export const Checkbox = ({ children, checked, inError, inWarning, ...checkboxProps }) => {
  return (
    <label>
      <CheckInput checked={checked} type="checkbox" {...checkboxProps} />
      {checked ? <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="checkbox-checked"/></IconStyled> : <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="checkbox"/></IconStyled> }
      <Label inError={inError} inWarning={inWarning}>{children}</Label>
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  inError: PropTypes.bool,
  inWarning: PropTypes.bool
};

Checkbox.defaultProps = {
  checked: false,
  inError: false,
  inWarning: false,
};
