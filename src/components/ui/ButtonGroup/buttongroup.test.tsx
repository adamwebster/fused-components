import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { ButtonGroup } from './index';
import { Button } from '../Button';

afterEach(cleanup);

describe('Button Group Tests', () => {
  test('It renders the button group correctly', () => {
    const { getByText } = render(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>,
    );
    expect(getByText('Button 1')).toBeInTheDocument();
    expect(getByText('Button 2')).toBeInTheDocument();
    expect(getByText('Button 3')).toBeInTheDocument();
  });
  test('It renders the primary button group correctly', () => {
    const { getByText } = render(
      <ButtonGroup>
        <Button primary>Button 1</Button>
        <Button primary>Button 2</Button>
        <Button primary>Button 3</Button>
      </ButtonGroup>,
    );
    expect(getByText('Button 1')).toBeInTheDocument();
    expect(getByText('Button 2')).toBeInTheDocument();
    expect(getByText('Button 3')).toBeInTheDocument();
  });
});
