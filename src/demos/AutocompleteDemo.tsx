import React, { useState } from "react";
import { Autocomplete } from "../components/ui/Autocomplete/";
import { FCThemeProvider } from "../theming/FCTheme";
import { DarkModeWrapper } from "../common/styles";

export const AutocompleteDemo = () => {
  const [theme] = useState("dark");
  return (
    <FCThemeProvider value={{ theme }}>
        <DarkModeWrapper>
        <Autocomplete
          inputIcon="filter"
          placeholder="Search for something"
          items={["Apple", "Orange", "Banana"]}
        />
        </DarkModeWrapper>
    </FCThemeProvider>
  );
};
