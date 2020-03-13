import React, { ReactNode } from "react";
import { Label, IconStyled, CheckInput } from "./style";
import { Icon } from "../../icon/";
import { FCThemeConsumer } from "../../../theming/FCTheme";

export interface Props extends React.HTMLProps<HTMLInputElement> {
  children?: ReactNode;
  /** Set to true if the checkbox is checked */
  checked?: boolean;
  /** Set the checkbox to be in its error state */
  inError?: boolean;
  /** Set the checkbox to be in its warning state */
  inWarning?: boolean;
  /** The on change function for the input */
  onChange?: () => void;
}

export const Checkbox = ({
  children,
  checked = false,
  inError = false,
  inWarning = false,
  onChange = () => undefined
}: Props) => {
  return (
    <FCThemeConsumer>
      {themeContext => (
        <label>
          <CheckInput
            type="checkbox"
            checked={checked}
            onChange={() => onChange()}
          />
          {checked ? (
            <IconStyled
              theme={themeContext?.theme}
              inError={inError}
              inWarning={inWarning}
            >
              {" "}
              <Icon icon="checkbox-checked" />
            </IconStyled>
          ) : (
            <IconStyled inError={inError} inWarning={inWarning}>
              {" "}
              <Icon icon="checkbox" />
            </IconStyled>
          )}
          <Label
            theme={themeContext?.theme}
            inError={inError}
            inWarning={inWarning}
          >
            {children}
          </Label>
        </label>
      )}
    </FCThemeConsumer>
  );
};
