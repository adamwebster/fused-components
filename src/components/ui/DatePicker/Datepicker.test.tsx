import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-styled-components';

import { DatePicker } from './';

afterEach(cleanup);

describe('Date picker Tests', () => {
  test('it renders the date picker component', () => {
    render(<DatePicker />);
  });
});
