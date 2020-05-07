import React, { useState } from 'react';
import { Checkbox } from '../components/ui/Checkbox';
import { FCThemeProvider } from '../theming/FCTheme';
import { DarkModeWrapper } from '../common/styles';

export const CheckboxDemo = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox id="checkbox5-0" checked={checked} onChange={() => setChecked(!checked)}>
      Check me
    </Checkbox>
  );
};

export const CheckboxDarkMode = () => {
  const [checked, setChecked] = useState(false);
  const [checkedInError, setCheckedError] = useState(false);
  const [checkedInWarning, setCheckedWarning] = useState(false);

  return (
    <DarkModeWrapper>
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Checkbox id="checkbox5-1" checked={checked} onChange={() => setChecked(!checked)}>
          Check me
        </Checkbox>
        <br />
        <Checkbox id="checkbox5-2" inError checked={checkedInError} onChange={() => setCheckedError(!checkedInError)}>
          Check me
        </Checkbox>
        <br />
        <Checkbox
          id="checkbox5-3"
          inWarning
          checked={checkedInWarning}
          onChange={() => setCheckedWarning(!checkedInWarning)}
        >
          Check me
        </Checkbox>
      </FCThemeProvider>
    </DarkModeWrapper>
  );
};
