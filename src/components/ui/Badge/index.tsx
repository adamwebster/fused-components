import React from "react";
import { StyledBadge } from "./style";
import { fcStyles } from "../../../common/types";
import { FCThemeConsumer } from "../../../theming/FCTheme";

export interface Props {
  /** Set the style of the badge */
  fcStyle?: fcStyles;
  children: any;
}
export const Badge = ({ fcStyle, ...rest }: Props) => {
  return (
    <FCThemeConsumer>
      {themeContext => (
        <StyledBadge fcStyle={fcStyle} theme={themeContext?.theme} {...rest} />
      )}
    </FCThemeConsumer>
  );
};
