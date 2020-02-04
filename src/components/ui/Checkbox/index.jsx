import React from "react";
import { Label, Icon, CheckInput } from "./style";
import PropTypes from "prop-types";

export const Checkbox = ({ children, checked, inError, inWarning, ...checkboxProps }) => {
  return (
    <label>
      <CheckInput checked={checked} type="checkbox" {...checkboxProps} />
      {checked ? <Icon  inError={inError} inWarning={inWarning} transform="shrink-6" icon="check" mask={['fas', 'square']}/> : <Icon inError={inError} inWarning={inWarning} icon={["far", "square"]} />}
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
