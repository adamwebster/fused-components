import React from 'react';
import { FCThemeProvider } from '../theming/FCTheme';
import { Combobox } from '../components/ui/Combobox';
import { DarkModeWrapper } from '../common/styles';

export const ComboboxDemo = () => {
  return (
    <FCThemeProvider value={{ theme: 'dark' }}>
      <DarkModeWrapper>
        <Combobox
          inputIcon="filter"
          items={["Apple", "Orange", "Banana"]}
          placeholder="Dark mode combobox"
        />
      </DarkModeWrapper>
    </FCThemeProvider>
  )
}

export const ComboboxDemoItemFormatter = () => {
  const data = [{ label: "Apple", description: 'Apples are red and are crunchy.' }, { label: "Banana", description: 'Bananas are yellow you have to peel them.' }, { label: "Orange", description: 'Oranges have a hard peel and are full of vitamin C.' }];

  return (
    <Combobox
      inputIcon="filter"
      placeholder="Dark mode combobox"
      items={data}
      itemFormatter={(value) => {
        return (
          <>
            <div>{data[value].label}</div>
            <div style={{ fontSize: '12px', color: '#aaa' }}>{data[value].description}</div>
          </>
        )
      }
      }
      keyToSearch="label"

    />
  )
}