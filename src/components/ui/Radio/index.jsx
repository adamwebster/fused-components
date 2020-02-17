import React from "react";
import { Label, IconStyled, RadioInput } from "./style";
import PropTypes from "prop-types";
import { Icon } from '../../icon/';

export const Radio = ({ children, checked, inWarning, inError, ...radioProps }) => {
  return (
    <label>
      <RadioInput inError={inError} inWarning={inWarning} type="radio" {...radioProps} />
      {checked ? <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="radio-checked"/></IconStyled> : <IconStyled inError={inError} inWarning={inWarning}> <Icon icon="radio"/></IconStyled> }
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
