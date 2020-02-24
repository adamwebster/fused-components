import React, { useState } from "react";
import { Autocomplete } from "../components/ui/Autocomplete/";
import { FCThemeProvider } from "../theming/FCTheme";

export const AutocompleteDemo = () => {
  const [theme] = useState("dark");
  return (
    <FCThemeProvider value={{ theme }}>
        <Autocomplete
          inputIcon="filter"
          placeholder="Search for something"
          items={["Apple", "Orange", "Banana"]}
        />
    </FCThemeProvider>
  );
};
