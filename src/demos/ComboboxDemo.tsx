import React from 'react';
import { FCThemeProvider } from '../theming/FCTheme';
import { Combobox } from '../components/ui/Combobox';
import { DarkModeWrapper } from '../common/styles';

export const ComboboxDemo = () => {
  return(
    <FCThemeProvider value={{theme: 'dark'}}>
     <DarkModeWrapper>
      <Combobox inputIcon="filter" placeholder="Dark mode combobox" />
      </DarkModeWrapper>
    </FCThemeProvider>
  )
}