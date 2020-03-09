import React, { useState } from 'react';
import { Checkbox } from '../components/ui/Checkbox'
import { FCThemeProvider } from '../theming/FCTheme';
import { DarkModeWrapper } from '../common/styles';

export const CheckboxDemo = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox checked={checked} onChange={() => setChecked(!checked)}>Check me</Checkbox>
  )
}

export const CheckboxDarkMode = () => {
  const [checked, setChecked] = useState(false);
  const [checkedInError, setCheckedError] = useState(false);
  const [checkedInWarning, setCheckedWarning] = useState(false);

  return (
    <DarkModeWrapper>
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)}>Check me</Checkbox>
       <br />
        <Checkbox inError checked={checkedInError} onChange={() => setCheckedError(!checkedInError)}>Check me</Checkbox>
        <br />
        <Checkbox inWarning checked={checkedInWarning} onChange={() => setCheckedWarning(!checkedInWarning)}>Check me</Checkbox>

      </FCThemeProvider>
    </DarkModeWrapper>
  )
}
