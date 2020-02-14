import React from "react";
import { Label, Icon, CheckInput } from "./style";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Checkbox = ({ children, checked, inError, inWarning, ...checkboxProps }) => {
  return (
    <label>
      <CheckInput checked={checked} type="checkbox" {...checkboxProps} />
      {checked ? <Icon inError={inError} inWarning={inWarning}><FontAwesomeIcon transform="shrink-6" icon="check" mask={['fas', 'square']}/></Icon> : <Icon inError={inError} inWarning={inWarning}><FontAwesomeIcon icon={["far", "square"]} /></Icon>}
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
