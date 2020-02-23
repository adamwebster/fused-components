import React from "react";
import { Alert } from "../components/ui/Alert";
import { FCThemeProvider } from "../theming/FCTheme";

export const AlertDemo = () => {
  return (
    <FCThemeProvider value={{ theme: "dark" }}>
      <Alert icon="no-entry-circle" title="Themed Danger" fcStyle="danger">
        Demo
      </Alert>
      <br /><br />
      <Alert  icon="check-circle"  title="Themed Danger" fcStyle="success">
        Demo
      </Alert>
      <br /><br />
      <Alert  icon="exclamation-circle"  title="Themed Danger" fcStyle="warning">
        Demo
      </Alert>
      <br /><br />
      <Alert icon="question-circle" title="Themed Danger" fcStyle="info">
        Demo
      </Alert>
    </FCThemeProvider>
  );
};
