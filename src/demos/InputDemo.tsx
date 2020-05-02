import React from 'react';
import { Input } from '../components/ui/Input';
import { DarkModeWrapper } from '../common/styles';
import { FCThemeProvider } from '../theming/FCTheme';

export const InputDarkMode = () => {
  return (
    <FCThemeProvider value={{ theme: 'dark' }}>
      <DarkModeWrapper>
        <Input placeholder="Dark Mode" />
        <br />
        <Input aria-label="Disabled Input" disabled />
        <br />
        <Input inError aria-label="Error Input" />
        <br />
        <Input inWarning aria-label="Warning Input" />
        <br />
        <Input icon="search" aria-label="Icon Input" />
        <br />
        <Input inError icon="times-circle" aria-label="Icon Input" />
        <br />
        <Input inWarning icon="exclamation-circle" aria-label="Icon Input" />
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
