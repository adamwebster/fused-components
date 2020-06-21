import React, { ReactElement } from 'react';
import { FCThemeProvider } from '../theming/FCTheme';
import { Combobox } from '../components/ui/Combobox';
import { DarkModeWrapper } from '../common/styles';

export const ComboboxDemo = () => {
  return (
    <FCThemeProvider value={{ theme: 'dark' }}>
      <DarkModeWrapper>
        <Combobox id="cb2" inputIcon="filter" items={['Apple', 'Orange', 'Banana']} placeholder="Dark mode combobox" />
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};

export const ComboboxDemoItemFormatter = () => {
  const data = [
    { label: 'Apple', description: 'Apples are red and are crunchy.' },
    { label: 'Banana', description: 'Bananas are yellow you have to peel them.' },
    { label: 'Orange', description: 'Oranges have a hard peel and are full of vitamin C.' },
  ];

  return (
    <div>
      <Combobox
        id="cb3"
        inputIcon="filter"
        placeholder="Dark mode combobox"
        items={data}
        itemFormatter={(value): ReactElement => {
          return (
            <>
              <div>{data[value].label}</div>
              <div style={{ fontSize: '12px', color: '#aaa' }}>{data[value].description}</div>
            </>
          );
        }}
        keyToSearch="label"
      />
    </div>
  );
};
