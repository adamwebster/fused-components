import React, { useState } from 'react';
import { Toggle } from '../components/ui/Toggle';
import { FCThemeProvider } from '../theming/FCTheme';
import { DarkModeWrapper } from '../common/styles';
import { Button } from '../components/ui/Button';

export const ToggleDemo = () => {
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [activeLabels, setActiveLabels] = useState(false);
  return (
    <>
      <Button onClick={() => setDisabled(!disabled)}>Toggle disabled state</Button>
      <br /> <br />
      <Toggle disabled={disabled} active={active} onClick={() => setActive(!active)} />
      <br />
      <Toggle disabled={disabled} active={activeLabels} showLabels onClick={() => setActiveLabels(!activeLabels)} />
    </>
  );
};

export const ToggleDark = () => {
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [activeLabels, setActiveLabels] = useState(false);
  const [theme] = useState('dark');
  return (
    <>
      <FCThemeProvider value={{ theme }}>
        <DarkModeWrapper>
          <Button onClick={() => setDisabled(!disabled)}>Toggle disabled state</Button>
          <br /> <br />
          <Toggle disabled={disabled} active={active} onClick={() => setActive(!active)} />
          <br />
          <Toggle disabled={disabled} active={activeLabels} showLabels onClick={() => setActiveLabels(!activeLabels)} />
        </DarkModeWrapper>
      </FCThemeProvider>
    </>
  );
};
