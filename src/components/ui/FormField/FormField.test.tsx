import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { FormField } from './index';
import { Textarea } from '../Textarea';
import { color } from '../../../styles/styles';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('FormField Tests', () => {
  test('Renders the FormField component', () => {
    const { getByText } = render(
      <FormField label="test">
        <Textarea id="textarea" />
      </FormField>,
    );
    expect(getByText('test')).toBeInTheDocument();
  });

  test('Renders the asterisk when required is set to true', () => {
    const { getByText } = render(
      <FormField required label="test">
        <Textarea id="textarea" />
      </FormField>,
    );
    expect(getByText('*')).toBeInTheDocument();
  });

  test('Renders hint text', () => {
    const { getByText } = render(
      <FormField hint="Hint text" label="test">
        <Textarea id="textarea" />
      </FormField>,
    );
    expect(getByText('Hint text')).toBeInTheDocument();
  });

  test('Renders validation text', () => {
    const { getByText } = render(
      <FormField validationMessage="validation text" label="test">
        <Textarea id="textarea" />
      </FormField>,
    );
    expect(getByText('validation text')).toBeInTheDocument();
  });

  test('Renders correctly hint text color in dark mode', () => {
    const { getByText } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <FormField hint="Hint text" label="test">
          <Textarea id="textarea" />
        </FormField>
      </FCThemeProvider>,
    );
    expect(getByText('Hint text')).toHaveStyleRule('color', color.medium);
  });
});
