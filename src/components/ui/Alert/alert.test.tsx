import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { Alert } from './index';
import renderer from 'react-test-renderer';
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
      <Alert title="Alert" icon="fcInfo">
        Danger Alert{' '}
      </Alert>,
    );

    const icon = getByRole('img');
    expect(icon).toHaveClass('fcInfo');
  });

  test('Renders correctly with no title added', () => {
    render(<Alert>Danger Alert </Alert>);
  });

  test('Setting the border radius to false resets the border radius', () => {
    const container = renderer.create(<Alert borderRadius={false}>Alert</Alert>).toJSON();
    expect(container).toHaveStyleRule('border-radius', undefined);
  });

  test('Text color is the correct color', () => {
    const container = renderer
      .create(
        <FCThemeProvider value={{ theme: 'dark' }}>
          <Alert borderRadius={false}>Alert</Alert>
        </FCThemeProvider>,
      )
      .toJSON();
    expect(container).toHaveStyleRule('color', color.medium);
  });
});
