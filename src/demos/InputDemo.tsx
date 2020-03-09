import React from "react";
import { Input } from "../components/ui/Input";
import { InputField } from "../components/ui/InputField";

import { DarkModeWrapper } from "../common/styles";
import { FCThemeProvider } from "../theming/FCTheme";

export const InputDarkMode = () => {
  return (
    <FCThemeProvider value={{ theme: "dark" }}>
      <DarkModeWrapper>
        <Input placeholder="Dark Mode" />
        <br />
        <Input ariaLabel="Disabled Input" disabled />
        <br />
        <Input inError ariaLabel="Error Input" />
        <br />
        <Input inWarning ariaLabel="Warning Input" />
        <br />
        <Input icon="search" ariaLabel="Icon Input" />
        <br />
        <Input inError icon="times-circle" ariaLabel="Icon Input" />
        <br />
        <Input inWarning icon="exclamation-circle" ariaLabel="Icon Input" />
        <br />
        <InputField
          id="TestInput"
          label="Input Field"
          hint="Type something into the input above"
          required
          inError
          validationMessage="Invalid entry."
        />
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
