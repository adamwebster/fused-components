import React from "react";
import { Alert } from "../components/ui/Alert";
import { FCThemeProvider } from "../theming/FCTheme";

export const AlertDemo = () => {
  return (
  <FCThemeProvider value={{theme: 'dark'}}>
  <Alert>Demo</Alert>
  </FCThemeProvider>
  );
};
