import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { Alert } from './index';
import renderer from 'react-test-renderer';
import { color } from '../../../styles/styles';
import { fcStyles } from '../../../common/types';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

const styledAlert = (style: fcStyles) =>
  renderer
    .create(
      <Alert title="Alert" fcStyle={style}>
        This is an danger alert
      </Alert>,
    )
    .toJSON();

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

  test('Renders the correct color the fcStyle prop is set to danger', () => {
    const container = styledAlert('danger');
    expect(container).toHaveStyleRule('background-color', color.danger);
  });

  test('Renders the correct color the fcStyle prop is set to warning', () => {
    const container = styledAlert('warning');
    expect(container).toHaveStyleRule('background-color', color.warning);
  });

  test('Renders the correct color the fcStyle prop is set to info', () => {
    const container = styledAlert('info');
    expect(container).toHaveStyleRule('background-color', color.info);
  });

  test('Renders the correct color the fcStyle prop is set to success', () => {
    const container = styledAlert('success');
    expect(container).toHaveStyleRule('background-color', color.success);
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
