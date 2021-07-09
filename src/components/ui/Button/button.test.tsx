import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Button } from './index';
import { Icon } from '../../icon';
import { color } from '../../../styles/styles';
import { fcStyles } from '../../../common/types';
import renderer from 'react-test-renderer';

afterEach(cleanup);

const styledButton = (style: fcStyles) => renderer.create(<Button fcStyle={style}>Button</Button>).toJSON();
const styledPrimaryButton = (style: fcStyles) =>
  renderer
    .create(
      <Button primary fcStyle={style}>
        Button
      </Button>,
    )
    .toJSON();

describe('Button Tests', () => {
  test('The button renders', () => {
    const { getByText } = render(<Button>Button</Button>);
    expect(getByText('Button')).toBeInTheDocument();
  });

  test('The button renders when as is set to a', () => {
    const { getByText } = render(<Button as="a">Button</Button>);
    expect(getByText('Button')).toBeInTheDocument();
  });

  test('The button is disabled', () => {
    const { getByText } = render(<Button disabled>Button</Button>);
    expect(getByText('Button')).toBeDisabled();
  });

  test('if isLoading is set as well as an icon it renders correctly', () => {
    const { getByRole } = render(
      <Button isLoading loadingIcon={<Icon icon="check-circle" />}>
        Button
      </Button>,
    );
    const loadingIcon = getByRole('img');
    expect(loadingIcon).toBeInTheDocument;
  });
  test('If the button has an icon it renders correctly', () => {
    const { getByRole } = render(<Button icon="check-circle">Button</Button>);
    const iconButton = getByRole('img');
    expect(iconButton).toBeInTheDocument;
  });
  test('If the button has an icon it renders correctly', () => {
    const { getByRole } = render(<Button icon="check-circle">Button</Button>);
    const iconButton = getByRole('img');
    expect(iconButton).toBeInTheDocument;
  });
  test('Renders the correct color the fcStyle prop is set to danger', () => {
    const container = styledButton('danger');
    expect(container).toHaveStyleRule('border', `solid 1px ${color.danger}`);
    expect(container).toHaveStyleRule('color', '#000');
  });
  test('Renders the correct color the fcStyle prop is set to warning', () => {
    const container = styledButton('warning');
    expect(container).toHaveStyleRule('border', `solid 1px ${color.warning}`);
    expect(container).toHaveStyleRule('color', '#000');
  });
  test('Renders the correct color the fcStyle prop is set to info', () => {
    const container = styledButton('info');
    expect(container).toHaveStyleRule('border', `solid 1px ${color.info}`);
    expect(container).toHaveStyleRule('color', '#000');
  });
  test('Renders the correct color the fcStyle prop is set to warning', () => {
    const container = styledButton('success');
    expect(container).toHaveStyleRule('border', `solid 1px ${color.success}`);
    expect(container).toHaveStyleRule('color', '#000');
  });
  test('Renders the correct color when set to default', () => {
    const container = renderer.create(<Button>Button</Button>).toJSON();
    expect(container).toHaveStyleRule('border', `solid 1px ${color.primary}`);
    expect(container).toHaveStyleRule('color', '#000');
  });
  test('Renders the correct color when the primary button fcStyle prop is set to danger', () => {
    const container = styledPrimaryButton('danger');
    expect(container).toHaveStyleRule('background-color', color.dangerButton);
  });
  test('Renders the correct color when the primary button the fcStyle prop is set to warning', () => {
    const container = styledPrimaryButton('warning');
    expect(container).toHaveStyleRule('background-color', color.warningButton);
  });
  test('Renders the correct color when the primary button the fcStyle prop is set to info', () => {
    const container = styledPrimaryButton('info');
    expect(container).toHaveStyleRule('background-color', color.infoButton);
  });
  test('Renders the correct color when the primary button the fcStyle prop is set to warning', () => {
    const container = styledPrimaryButton('success');
    expect(container).toHaveStyleRule('background-color', color.successButton);
  });
  test('Clicking the button fires the onClick function', () => {
    let initialValue = 'Hello';
    const onClick = jest.fn(() => {
      initialValue = 'World';
    });
    const { getByText } = render(<Button onClick={(): void => onClick()}>Button</Button>);
    const button = getByText('Button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(initialValue).toBe('World');
  });
});
