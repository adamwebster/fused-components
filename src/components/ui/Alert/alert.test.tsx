import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import { Alert } from './index';
import { color } from '../../../styles/styles';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Alert Tests', () => {
  test('Renders Alert with text and title', () => {
    const { getByText } = render(<Alert title="Alert Title">This is an alert</Alert>);
    expect(getByText('This is an alert')).toBeInTheDocument();
    expect(getByText('Alert Title')).toBeInTheDocument();
  });

  test('Alert has the correct icon when an icon is passed', () => {
    const { getByRole } = render(
      <Alert title="Alert" icon="check-circle">
        Danger Alert{' '}
      </Alert>,
    );
    const icon = getByRole('img');
    waitFor(() => {
      expect(icon).toHaveClass('check-circle');
    });
  });

  test('Renders correctly with no title added', () => {
    render(<Alert>Danger Alert </Alert>);
  });

  test('Setting the border radius to false resets the border radius', () => {
    const { getByRole } = render(
      <Alert role="alert" borderRadius={false}>
        Alert
      </Alert>,
    );
    const alert = getByRole('alert');
    expect(alert).toHaveStyleRule('border-radius', undefined);
  });

  test('Text color is the correct color', () => {
    const { getByRole } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Alert role="alert" borderRadius={false}>
          Alert
        </Alert>
      </FCThemeProvider>,
    );
    const alert = getByRole('alert');

    expect(alert).toHaveStyleRule('color', color.medium);
  });
});
