import React from "react";
import { Alert } from "../components/ui/Alert";
import { FCThemeProvider } from "../theming/FCTheme";
import { DarkModeWrapper } from "../common/styles";

export const AlertDemo = () => {
  const AlertText = "This is some text that will be shown with the alert";
  return (
    <FCThemeProvider value={{ theme: "dark" }}>
      <DarkModeWrapper>
      <Alert icon="no-entry-circle" title="Dark Mode Default">
          {AlertText}
        </Alert>
        <br />
        <br />
        <Alert icon="no-entry-circle" title="Dark Mode Danger" fcStyle="danger">
          {AlertText}
        </Alert>
        <br />
        <br />
        <Alert icon="check-circle" title="Dark Mode Success" fcStyle="success">
          {AlertText}
        </Alert>
        <br />
        <br />
        <Alert
          icon="exclamation-circle"
          title="Dark Mode Warning"
          fcStyle="warning"
        >
          {AlertText}
        </Alert>
        <br />
        <br />
        <Alert icon="question-circle" title="Dark Mode Info" fcStyle="info">
          {AlertText}
        </Alert>
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
