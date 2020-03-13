import React from "react";
import { ToggleWrapper, Slider, ToggleLabel } from "./style";
import { FCThemeConsumer } from "../../../theming/FCTheme";

export interface Props {
  /** If the toggle is active or not */
  active?: boolean;
  /** Display the on and off labels */
  showLabels?: boolean;
  /** What should happen when the toggle is clicked */
  onClick?: (e: any) => void;
}
export const Toggle = ({
  active = false,
  showLabels = false,
  onClick = () => {},
  ...rest
}: Props) => {
  return (
    <FCThemeConsumer>
      {themeContext => (
        <ToggleWrapper
          active={active}
          theme={themeContext?.theme}
          onClick={(e: any) => {
            onClick(e);
          }}
          {...rest}
        >
          <Slider theme={themeContext?.theme} active={active} />
          {showLabels && (
            <>
              <ToggleLabel theme={themeContext?.theme} >On</ToggleLabel>
              <ToggleLabel theme={themeContext?.theme} >Off</ToggleLabel>
            </>
          )}
        </ToggleWrapper>
      )}
    </FCThemeConsumer>
  );
};
