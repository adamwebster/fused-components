import React from "react";
import { Card } from "../components/ui/Card";
import { DarkModeWrapper } from "../common/styles";
import { FCThemeProvider } from "../theming/FCTheme";

export const CardDarkMode = () => {
  return (
    <FCThemeProvider value={{ theme: "dark" }}>
      <DarkModeWrapper>
        <Card>Dark Mode Card</Card>
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
