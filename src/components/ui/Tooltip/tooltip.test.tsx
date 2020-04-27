import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Tooltip } from './';

afterEach(cleanup);

describe('Tooltip Tests', () => {
  test('Renders the child text of the ', () => {
    const { getByText } = render(<Tooltip content="Tooltip Content">Trigger</Tooltip>);
    expect(getByText('Trigger')).toBeInTheDocument();
  });
  test('Hovering over the element shows the tooltip', () => {
    const { getByText } = render(<Tooltip content="Tooltip Content">Trigger</Tooltip>);
    const triggerElement = getByText('Trigger');
    fireEvent.mouseOver(triggerElement);
    expect(getByText('Tooltip Content')).toBeInTheDocument();
  });
});
