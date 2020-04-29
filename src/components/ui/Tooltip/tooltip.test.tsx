import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange } from '@testing-library/react';
import 'jest-styled-components';
import { Tooltip } from './index';

afterEach(cleanup);

describe('Tooltip Tests', () => {
  test('Renders tooltip trigger text', () => {
    const { getByText } = render(<Tooltip>This is an tooltip</Tooltip>);
    expect(getByText('This is an tooltip')).toBeInTheDocument();
  });

  test('Renders tooltip when it is hover', () => {
    const { getByText } = render(<Tooltip content="Hey look at me">This is an tooltip</Tooltip>);
    const ToHover = getByText('This is an tooltip');
    fireEvent.mouseOver(ToHover);
    waitForDomChange();
    expect(getByText('Hey look at me')).toBeInTheDocument();
  });

  test('Renders tooltip when it is clicked', () => {
    const { getByText } = render(
      <Tooltip triggerEvent="click" content="Hey look at me">
        This is an tooltip
      </Tooltip>,
    );
    const toClick = getByText('This is an tooltip');
    fireEvent.click(toClick);
    waitForDomChange();
    expect(getByText('Hey look at me')).toBeInTheDocument();
  });
});
