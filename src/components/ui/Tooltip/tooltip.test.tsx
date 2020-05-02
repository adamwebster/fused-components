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

  test('Renders tooltip  content when visible is set to true', () => {
    const { getByText } = render(
      <Tooltip visible content="Hey look at me">
        This is an tooltip
      </Tooltip>,
    );
    expect(getByText('Hey look at me')).toBeInTheDocument();
  });

  test('Renders tooltip  content when visible is set to true and attached to the body', () => {
    const { getByText } = render(
      <Tooltip targetElement="body" visible content="Hey look at me">
        This is an tooltip
      </Tooltip>,
    );
    expect(getByText('Hey look at me')).toBeInTheDocument();
  });

  test('Renders tooltip  content when visible is set to true and attached to the body and placement is set', () => {
    const { getByText } = render(
      <Tooltip targetElement="body" placement="top" visible content="Hey look at me">
        This is an tooltip
      </Tooltip>,
    );
    expect(getByText('Hey look at me')).toBeInTheDocument();
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

  test('Tooltip hides on mouseLeave', async () => {
    const { getByText, queryByText } = render(<Tooltip content="Hey look at me">This is an tooltip</Tooltip>);
    const ToHover = getByText('This is an tooltip');
    fireEvent.mouseOver(ToHover);
    await waitFor(
      () => {
        expect(getByText('Hey look at me')).toBeInTheDocument();
      },
      { timeout: 300 },
    );
    fireEvent.mouseLeave(ToHover);
    expect(queryByText('Hey look at me')).not.toBeInTheDocument();
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
