import React, { useState } from "react";
import { Autocomplete } from "../components/ui/Autocomplete/";
import { FCThemeProvider } from "../theming/FCTheme";
import { DarkModeWrapper } from "../common/styles";
import { Button } from "../components/ui/Button";

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

export const AutocompleteDemoFormatter = () => {
  const [data, setData] = useState([] as any);

  return (
    <>
        <Autocomplete
        onInputChange={() => setData([{ label: "Apple", description: 'Apples are red and are crunchy.' }, { label: "Banana", description: 'Bananas are yellow you have to peel them.' }, { label: "Orange", description: 'Oranges have a hard peel and are full of vitamin C.' }])}
          itemFormatter={(value) => {
            return (
              <>
              <div>{data[value].label}</div>
              <div style={{fontSize: '12px', color: '#aaa'}}>{data[value].description}</div>
              </>
            )
          }
          }
          inputIcon="search"
          placeholder="Search with formatting"
          keyToSearch="label"
          items={data}
        />
        </>
  );
};