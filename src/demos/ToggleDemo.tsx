import React, { useState } from "react";
import { Toggle } from "../components/ui/Toggle";
import { FCThemeProvider } from "../theming/FCTheme";

export const ToggleDemo = () => {
  const [active, setActive] = useState(false);
  const [activeLabels, setActiveLabels] = useState(false);
  const [theme, setTheme] = useState('light');
  return (
    <>
      <FCThemeProvider value={{ theme }}>
        <p>
      <label>Theme </label>
      <select onChange={e => setTheme(e.target.value)}>
        <option value="light">light</option>
        <option value="dark">dark</option>
      </select>
      </p>
        <Toggle active={active} onClick={() => setActive(!active)} />
        <br />
        <Toggle
          active={activeLabels}
          showLabels
          onClick={() => setActiveLabels(!activeLabels)}
        />
      </FCThemeProvider>
    </>
  );
};
