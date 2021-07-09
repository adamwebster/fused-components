import React, { useState } from 'react';
import { FormField } from '../components/ui/FormField';
import { FCThemeProvider } from '../theming/FCTheme';
import { DarkModeWrapper } from '../common/styles';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';

export const FormFieldDemo = () => {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <FCThemeProvider value={{ theme: '' }}>
      <FormField
        label="test"
        htmlFor="textarea-test"
        hint="Type in this text box or click the show validation message  button show the validation message"
        validationMessage={errorMessage}
      >
        <Textarea id="textarea-test" aria-describedby="textarea-test_hint textarea-test_validation_message" />
      </FormField>
      <Button onClick={() => setErrorMessage('This is an error')}>Show validation message</Button>
    </FCThemeProvider>
  );
};

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
