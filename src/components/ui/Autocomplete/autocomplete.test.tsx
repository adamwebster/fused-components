import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Autocomplete } from './index';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

describe('Autocomplete Tests', () => {
  test('Renders Autocomplete with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Autocomplete items={['Test', 'AnotherItem']} placeholder="Autocomplete test" />,
    );
    expect(getByPlaceholderText('Autocomplete test')).toBeInTheDocument();
  });

  test('Menu opens when input is typed into and has content', () => {
    const { getByPlaceholderText, getByText } = render(
      <Autocomplete items={['Test', 'Another Item']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');
    userEvent.type(input, 't');
    expect(getByText('Another Item')).toBeInTheDocument();
  });

  test('Menu closes when the escape key is clicked', () => {
    const { getByPlaceholderText, queryByText, container } = render(
      <Autocomplete items={['Test', 'Another Item']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');
    userEvent.type(input, 't');
    fireEvent.keyDown(container, { key: 'Escape', code: 'Escape', keyCode: 27 });
    expect(queryByText('Another Item')).toBeFalsy();
  });
});
