import React, { useState } from 'react';
import { Radio } from '../components/ui/Radio';
import { FCThemeProvider } from '../theming/FCTheme';
import { DarkModeWrapper } from '../common/styles';

export const RadioDemo = () => {
  const [checked, setChecked] = useState('Check 1');
  const [radioOneValue] = useState('Check 1');
  const [radioTwoValue] = useState('Check 2');
  return (
    <>
      <Radio
        id="radio1"
        value="Check 1"
        name="RadioGroup1"
        checked={radioOneValue === checked}
        onKeyPress={() => setChecked('Check 1')}
        onChange={e => setChecked(e.target.value)}
      >
        Check me
      </Radio>
      <br />
      <Radio
        id="radio2"
        value="Check 2"
        name="RadioGroup1"
        checked={radioTwoValue === checked}
        onKeyPress={() => setChecked('Check 2')}
        onChange={e => setChecked(e.target.value)}
      >
        Check me 2
      </Radio>
    </>
  );
};

export const RadioDarkMode = () => {
  const [checked, setChecked] = useState('Check 1');
  const [radioOneValue] = useState('Check 1');
  const [radioTwoValue] = useState('Check 2');
  const [radioThreeValue] = useState('Check 3');
  const [radioFourValue] = useState('Check 4');

  return (
    <>
      <DarkModeWrapper>
        <FCThemeProvider value={{ theme: 'dark' }}>
          <Radio
            id="radioD1"
            value="Check 1"
            name="RadioGroup1"
            checked={radioOneValue === checked}
            onChange={e => setChecked(e.target.value)}
          >
            Check me
          </Radio>
          <br />
          <Radio
            id="radioD2"
            value="Check 2"
            name="RadioGroup1"
            checked={radioTwoValue === checked}
            onChange={e => setChecked(e.target.value)}
          >
            Check me 2
          </Radio>
          <br />
          <Radio
            id="radioD3"
            value="Check 3"
            inWarning
            name="RadioGroup1"
            checked={radioThreeValue === checked}
            onChange={(e): void => setChecked(e.target.value)}
          >
            Check me 3
          </Radio>
          <br />
          <Radio
            id="radioD4"
            value="Check 4"
            inError
            name="RadioGroup1"
            checked={radioFourValue === checked}
            onChange={(e): void => setChecked(e.target.value)}
          >
            Check me 4
          </Radio>
        </FCThemeProvider>
      </DarkModeWrapper>
    </>
  );
};
