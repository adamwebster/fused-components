import React from "react";
import { FCThemeProvider } from "../theming/FCTheme";
import { Label } from "../components/ui/Label";
import { DarkModeWrapper } from "../common/styles";

export const LabelDark = () => {
  return (
    <FCThemeProvider value={{ theme: "dark" }}>
      <DarkModeWrapper>
        <Label>Dark Label</Label>
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
