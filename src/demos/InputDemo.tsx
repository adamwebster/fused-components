import React from 'react';
import { Input } from '../components/ui/Input';
import { DarkModeWrapper } from '../common/styles';
import { FCThemeProvider } from '../theming/FCTheme';

export const InputDarkMode = () => {
  return (
    <FCThemeProvider value={{ theme: 'dark' }}>
      <DarkModeWrapper>
        <Input id="input1" placeholder="Dark Mode" />
        <br />
        <Input id="input2" aria-label="Disabled Input" disabled />
        <br />
        <Input id="input3" inError aria-label="Error Input" />
        <br />
        <Input id="input4" inWarning aria-label="Warning Input" />
        <br />
        <Input id="input5" icon="search" aria-label="Icon Input" />
        <br />
        <Input id="input6" inError icon="times-circle" aria-label="Icon Input" />
        <br />
        <Input id="input7" inWarning icon="exclamation-circle" aria-label="Icon Input" />
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
