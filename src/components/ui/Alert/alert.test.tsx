import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { Alert } from './index';
import renderer from 'react-test-renderer';
import { fcStyles } from '../../../common/types';

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
  test('Renders Alert with text', () => {
    const { getByText } = render(<Alert>This is an alert</Alert>);
    expect(getByText('This is an alert')).toBeInTheDocument();
  });

  test('Alert has correct border color when no style is set', () => {
    const container = renderer.create(<Alert>Alert</Alert>).toJSON();
    expect(container).toHaveStyleRule('border-color', '#666666');
  });

  test('Alert has correct border color when it is an danger alert', () => {
    const container = styledAlert('danger');
    expect(container).toHaveStyleRule('border-color', '#dd2c2e');
  });

  test('Alert has correct border color when it is an warning alert', () => {
    const container = styledAlert('warning');
    expect(container).toHaveStyleRule('border-color', '#eba300');
  });

  test('Alert has correct border color when it is an success alert', () => {
    const container = styledAlert('success');
    expect(container).toHaveStyleRule('border-color', '#79ca4c');
  });

  test('Alert has correct border color when it is an info alert', () => {
    const container = styledAlert('info');
    expect(container).toHaveStyleRule('border-color', '#1c91dc');
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
});
