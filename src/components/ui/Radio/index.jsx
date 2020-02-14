import React from "react";
import { Label, Icon, RadioInput } from "./style";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Radio = ({ children, checked, inWarning, inError, ...radioProps }) => {
  return (
    <label>
      <RadioInput inError={inError} inWarning={inWarning} type="radio" {...radioProps} />
      {checked ? <Icon inError={inError} inWarning={inWarning}><FontAwesomeIcon transform="shrink-9" icon={["fas", "circle"]} mask={['fas', 'circle']}/></Icon> : <Icon inError={inError} inWarning={inWarning}><FontAwesomeIcon icon={["far", "circle"]} /></Icon>}
      <Label inError={inError} inWarning={inWarning}>{children}</Label>
    </label>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
  inError: PropTypes.bool,
  inWarning: PropTypes.bool,
};

Radio.defaultProps = {
  checked: false,
  inError: false,
  inWarning: false,
};
