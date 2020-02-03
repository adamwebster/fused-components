import React from "react";
import { Label, Icon, CheckInput } from "./style";
import PropTypes from "prop-types";

export const Checkbox = ({ children, checked, ...checkboxProps }) => {
  return (
    <label>
      <CheckInput checked={checked} type="checkbox" {...checkboxProps} />
      {checked ? <Icon transform="shrink-6" icon="check" mask={['fas', 'square']}/> : <Icon icon={["far", "square"]} />}
      <Label>{children}</Label>
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool
};

Checkbox.defaultProps = {
  checked: false
};
