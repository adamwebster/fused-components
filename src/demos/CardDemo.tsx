import React from 'react';
import { Card } from '../components/ui/Card';
import { DarkModeWrapper } from '../common/styles';
import { FCThemeProvider } from '../theming/FCTheme';
import { Input, Label, Button } from '../components';

export const CardDarkMode = () => {
  return (
    <FCThemeProvider value={{ theme: 'dark' }}>
      <DarkModeWrapper>
        <Card boxShadow borderRadius="5px" style={{ padding: 10 + 'px' }}>
          <div style={{ marginBottom: 10 + 'px' }}>
            <Label htmlFor="username">Username</Label>
            <Input id="username" />
          </div>
          <div style={{ marginBottom: 10 + 'px' }}>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" />
          </div>
          <Button icon="lock-locked" primary style={{ marginRight: 5 + 'px' }}>
            Login
          </Button>
          <Button>Forgot Password</Button>
        </Card>
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
