import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Label, Icon, CheckInput} from './style';

export const Checkbox = ({ children, checked }) => {
  return (
    <label>
      <CheckInput checked={checked} type="checkbox" />
      {checked ? (
        <Icon icon="check" />
      ) : (
        <Icon icon={["far", "square"]} />
      )}
      <Label>{children}</Label>
    </label>
  );
};
