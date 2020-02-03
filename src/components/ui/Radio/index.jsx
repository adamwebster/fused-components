import React from "react";
import { Label, Icon, RadioInput } from "./style";
import PropTypes from "prop-types";

export const Radio = ({ children, checked, ...radioProps }) => {
  return (
    <label>
      <RadioInput type="radio" {...radioProps} />
      {checked ? <Icon transform="shrink-10" icon={["fas", "circle"]} mask={['fas', 'circle']}/> : <Icon icon={["far", "circle"]} />}
      <Label>{children}</Label>
    </label>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool
};

Radio.defaultProps = {
  checked: false
};
