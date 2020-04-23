import React from 'react';
import { FormField } from '../components/ui/FormField';
import { FCThemeProvider } from '../theming/FCTheme';
import { DarkModeWrapper } from '../common/styles';
import { Textarea } from '../components/ui/Textarea';

export const FormFieldDark = () => {
  return (
    <FCThemeProvider value={{ theme: 'dark' }}>
      <DarkModeWrapper>
        <FormField label="test" htmlFor="textarea-dark" hint="This is a hint" validationMessage="Something went wrong">
          <Textarea id="textarea-dark" />
        </FormField>
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
