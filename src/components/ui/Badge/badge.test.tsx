import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { Badge } from './index';
import renderer from 'react-test-renderer';
import { color } from '../../../styles/styles';
import { fcStyles } from '../../../common/types';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

const styledBadge = (style: fcStyles) => renderer.create(<Badge fcStyle={style}>Badget</Badge>).toJSON();

describe('Badge Tests', () => {
  test('Renders the component', () => {
    const { getByText } = render(<Badge>I am a badge</Badge>);
    expect(getByText('I am a badge')).toBeInTheDocument();
  });
  test('Renders the correct color the fcStyle prop is set to danger', () => {
    const container = styledBadge('danger');
    expect(container).toHaveStyleRule('border', `solid 1px ${color.danger}`);
  });
  test('Renders the correct color the fcStyle prop is set to warning', () => {
    const container = styledBadge('warning');
    expect(container).toHaveStyleRule('border', `solid 1px ${color.warning}`);
  });
  test('Renders the correct color the fcStyle prop is set to info', () => {
    const container = styledBadge('info');
    expect(container).toHaveStyleRule('border', `solid 1px ${color.info}`);
  });
  test('Renders the correct color the fcStyle prop is set to warning', () => {
    const container = styledBadge('success');
    expect(container).toHaveStyleRule('border', `solid 1px ${color.success}`);
  });

  test('Renders correctly in dark mode', () => {
    const container = renderer
      .create(
        <FCThemeProvider value={{ theme: 'dark' }}>
          <Badge>I am a badge</Badge>
        </FCThemeProvider>,
      )
      .toJSON();

    expect(container).toHaveStyleRule('border', `solid 1px ${color.medium}`);
    expect(container).toHaveStyleRule('background-color', `${color.darkModeDarker}`);
  });

  test('Renders correctly in light mode', () => {
    const container = renderer
      .create(
        <FCThemeProvider value={{ theme: 'light' }}>
          <Badge>I am a badge</Badge>
        </FCThemeProvider>,
      )
      .toJSON();

    expect(container).toHaveStyleRule('border', `solid 1px #333`);
    expect(container).toHaveStyleRule('background-color', 'transparent');
  });
});
