import React, { ReactElement } from 'react';
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

  test('Item format renders the menu itmes', () => {
    const data = [
      {
        label: 'Apple',
        description: 'A fruit',
      },
    ];
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete
        itemFormatter={(index): ReactElement => (
          <div>
            <span>{data[index].label}</span> <br />
            <span>{data[index].description}</span>
          </div>
        )}
        items={data}
        keyToSearch="label"
        placeholder="Autocomplete test"
      />,
    );
    const input = getByPlaceholderText('Autocomplete test');
    userEvent.type(input, 'a');
    expect(getByText('Apple')).toBeInTheDocument();
    expect(getByText('A fruit')).toBeInTheDocument();
  });

  test('Clicking the down arrow highlights the correct item in the menu', () => {
    const { getByRole, getByPlaceholderText } = render(
      <Autocomplete items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 't');
    const menu = getByRole('listbox');

    fireEvent.keyDown(menu, { keyCode: 40 });

    expect(input.getAttribute('aria-activedescendant')).toBe('Test');
  });

  test('Clicking the down arrow twice and then up highlights the correct item in the menu', () => {
    const { getByRole, getByPlaceholderText } = render(
      <Autocomplete items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 't');
    const menu = getByRole('listbox');

    fireEvent.keyDown(menu, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('Test');
    fireEvent.keyDown(menu, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('Test2');
    fireEvent.keyDown(menu, { keyCode: 38 });
    expect(input.getAttribute('aria-activedescendant')).toBe('Test');
  });
});
