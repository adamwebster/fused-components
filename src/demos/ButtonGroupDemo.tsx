import React from 'react';
import { ButtonGroup } from '../components/ui/ButtonGroup';
import { Button } from '../components/ui/Button';
import { DarkModeWrapper } from '../common/styles';
import { FCThemeProvider } from '../theming/FCTheme';

export const ButtonGroupDarkMode = () => {
  return (
    <DarkModeWrapper>
      <FCThemeProvider value={{ theme: 'dark' }}>
        <ButtonGroup>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <Button primary>Button 1</Button>
          <Button primary>Button 2</Button>
          <Button primary>Button 3</Button>
        </ButtonGroup>
      </FCThemeProvider>
    </DarkModeWrapper>
  );
};
