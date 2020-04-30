import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { Card } from './index';
import renderer from 'react-test-renderer';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Card Tests', () => {
  test('Renders the Card component', () => {
    const { getByText } = render(<Card>I am a card</Card>);
    expect(getByText('I am a card')).toBeInTheDocument();
  });

  test('Renders the Card component when the dark theme is used', () => {
    const { getByText } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Card>I am a card</Card>
      </FCThemeProvider>,
    );
    expect(getByText('I am a card')).toBeInTheDocument();
  });
  test('Setting the border radius applies the correct value', () => {
    const container = renderer.create(<Card borderRadius="10px">I am a card</Card>).toJSON();
    expect(container).toHaveStyleRule('border-radius', '10px');
  });

  test('If the borderRadius prop is not set then the border radius is 5px', () => {
    const container = renderer.create(<Card>I am a card</Card>).toJSON();
    expect(container).toHaveStyleRule('border-radius', '5px');
  });
  test('Setting the boxShadow prop applies the correct style', () => {
    const container = renderer.create(<Card boxShadow>I am a card</Card>).toJSON();
    expect(container).toHaveStyleRule('box-shadow', '0 0 5px rgba(0,0,0,0.25)');
  });
});
