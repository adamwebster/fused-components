import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import { Tooltip } from './index';

afterEach(cleanup);

describe('Tooltip Tests', () => {
  test('Renders tooltip trigger text', () => {
    const { getByText } = render(<Tooltip>This is an tooltip</Tooltip>);
    expect(getByText('This is an tooltip')).toBeInTheDocument();
  });

  test('Renders tooltip when it is hover', async () => {
    const { getByText } = render(<Tooltip content="Hey look at me">This is an tooltip</Tooltip>);
    const ToHover = getByText('This is an tooltip');
    fireEvent.mouseOver(ToHover);
    await waitFor(
      () => {
        expect(getByText('Hey look at me')).toBeInTheDocument();
      },
      { timeout: 300 },
    );
  });

  test('Renders tooltip when it is clicked', async () => {
    const { getByText } = render(
      <Tooltip triggerEvent="click" content="Hey look at me">
        This is an tooltip
      </Tooltip>,
    );
    const toClick = getByText('This is an tooltip');
    fireEvent.click(toClick);
    await waitFor(
      () => {
        expect(getByText('Hey look at me')).toBeInTheDocument();
      },
      { timeout: 300 },
    );
  });
});
