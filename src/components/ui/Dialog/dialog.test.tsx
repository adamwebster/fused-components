import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';
import { Dialog } from './index';

afterEach(cleanup);

describe('Dialog Tests', () => {
  test('Renders the Dialog component', () => {
    const { getByText } = render(<Dialog>I am a dialog</Dialog>);
    expect(getByText('I am a dialog')).toBeInTheDocument();
  });

  test('Clicking the overlay closes the modal', () => {});
});
