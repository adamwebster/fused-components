import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { Label } from './index';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Label Tests', () => {
  test('Renders the Label component', () => {
    const { getByText } = render(<Label htmlFor="input">I am a label</Label>);
    expect(getByText('I am a label')).toBeInTheDocument();
  });

  test('Renders the for attribute', () => {
    const { getByText } = render(<Label htmlFor="input">I am a label</Label>);
    expect(getByText('I am a label').getAttribute('for')).toBe('input');
  });
  test('Renders the Label component | Dark mode', () => {
    const { container } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Label>I am a label</Label>
      </FCThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
