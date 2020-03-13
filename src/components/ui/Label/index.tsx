import React, { useContext } from "react";

import { LabelStyled } from "./style";
import { FCTheme } from "../../../theming/FCTheme";

export const Label = ({ ...rest }) => {
  const theme = useContext(FCTheme);
  return <LabelStyled theme={theme?.theme} {...rest} />;
};
