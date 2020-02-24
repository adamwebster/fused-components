import React, { useState } from "react";
import { Toggle } from "../components/ui/Toggle";
import { FCThemeProvider } from "../theming/FCTheme";
import { DarkModeWrapper } from "../common/styles";

export const ToggleDemo = () => {
  const [active, setActive] = useState(false);
  const [activeLabels, setActiveLabels] = useState(false);
  return (
    <>
      <Toggle active={active} onClick={() => setActive(!active)} />
      <br />
      <Toggle
        active={activeLabels}
        showLabels
        onClick={() => setActiveLabels(!activeLabels)}
      />
    </>
  );
};

export const ToggleDark = () => {
  const [active, setActive] = useState(false);
  const [activeLabels, setActiveLabels] = useState(false);
  const [theme, ] = useState("dark");
  return (
    <>
      <FCThemeProvider value={{ theme }}>
        <DarkModeWrapper>
          <Toggle active={active} onClick={() => setActive(!active)} />
          <br />
          <Toggle
            active={activeLabels}
            showLabels
            onClick={() => setActiveLabels(!activeLabels)}
          />
        </DarkModeWrapper>
      </FCThemeProvider>
    </>
  );
};
