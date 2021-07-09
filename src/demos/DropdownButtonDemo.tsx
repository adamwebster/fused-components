import React from 'react';

import { DarkModeWrapper } from '../common/styles';
import { DropdownButton } from '../components/ui/DropdownButton';
import { FCThemeProvider } from '../theming/FCTheme';

export const DropdownButtonDark = () => {
  return (
    <DarkModeWrapper>
      <FCThemeProvider value={{ theme: 'dark' }}>
        <DropdownButton id="dm1" label="Dark mode">
          <DropdownButton.Menu>
            <DropdownButton.MenuItem>Menu Item 1</DropdownButton.MenuItem>
            <DropdownButton.MenuItem>Menu Item 2</DropdownButton.MenuItem>
          </DropdownButton.Menu>
        </DropdownButton>

        <DropdownButton id="dm2" primary label="Dark mode">
          <DropdownButton.Menu>
            <DropdownButton.MenuItem>Menu Item 1</DropdownButton.MenuItem>
            <DropdownButton.MenuItem>Menu Item 2</DropdownButton.MenuItem>
          </DropdownButton.Menu>
        </DropdownButton>
      </FCThemeProvider>
    </DarkModeWrapper>
  );
};
