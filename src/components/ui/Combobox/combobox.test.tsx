import React, { ReactElement } from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import { Combobox } from './index';
import userEvent from '@testing-library/user-event';
import { color } from '../../../styles/styles';

import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Combobox Tests', () => {
  test('Renders the Combobox component', () => {
    const { getByPlaceholderText } = render(
      <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
    );
    expect(getByPlaceholderText('Combobox test')).toBeInTheDocument();
  });

  test('Renders the Combobox component with the theme provider set to dark', () => {
    const { getByPlaceholderText, getByRole, getByText } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
      </FCThemeProvider>,
    );
    const input = getByPlaceholderText('Combobox test');
    userEvent.type(input, 'test');
    const menu = getByRole('listbox');
    expect(menu).toHaveStyleRule('background-color', color.darkModeDark);
    userEvent.type(input, 'testfff');
    const noItemFound = getByText('Nothing found');
    expect(noItemFound).toHaveStyleRule('color', color.medium);
  });

  test('Options show when menu is opened', () => {
    const { getByPlaceholderText, getByText } = render(
      <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
    );
    const input = getByPlaceholderText('Combobox test');
    fireEvent.click(input);
    expect(getByText('Apple')).toBeInTheDocument();
  });
  test('Value of the input changes when an item is clicked', () => {
    const { getByPlaceholderText, getByText } = render(
      <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
    );
    const input = getByPlaceholderText('Combobox test');
    fireEvent.click(input);
    const option = getByText('Apple');
    fireEvent.mouseDown(option);
    expect(input).toHaveValue('Apple');
  });

  test('itemFormatter renders items in the list', () => {
    const data = [
      {
        label: 'Apple',
        description: 'A fruit',
      },
    ];
    const { getByPlaceholderText, getByText } = render(
      <Combobox
        id="cb1"
        items={data}
        placeholder="Combobox test"
        itemFormatter={(index): ReactElement => (
          <div>
            <span>{data[index].label}</span> <br />
            <span>{data[index].description}</span>
          </div>
        )}
      />,
    );
    const input = getByPlaceholderText('Combobox test');
    fireEvent.click(input);
    expect(getByText('Apple')).toBeInTheDocument();
  });

  test('Clicking outside of the menu closes the menu', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <>
        <button>Click me</button>
        <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />
      </>,
    );
    const input = getByPlaceholderText('Combobox test');
    fireEvent.click(input);
    expect(getByText('Apple')).toBeInTheDocument();
    const otherElement = getByText('Click me');
    fireEvent.mouseDown(otherElement);
    expect(input).toHaveValue('');
    expect(queryByText('Apple')).toBeFalsy();
  });

  test('Menu closes when the escape key is clicked', () => {
    const { getByPlaceholderText, queryByText, container } = render(
      <Combobox id="cb1" items={['Test', 'Another Item']} placeholder="Combobox test" />,
    );
    const input = getByPlaceholderText('Combobox test');
    fireEvent.click(input);
    fireEvent.keyDown(container, { key: 'Escape', code: 'Escape', keyCode: 27 });
    expect(queryByText('Another Item')).toBeFalsy();
  });

  test('Clicking the arrow keys highlights the correct item in the menu', () => {
    const { getByRole, getByPlaceholderText } = render(
      <Combobox id="cb1" items={['Test', 'Test2']} placeholder="Combobox test" />,
    );

    const input = getByPlaceholderText('Combobox test');
    fireEvent.click(input);

    const menu = getByRole('listbox');

    fireEvent.keyDown(menu, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('cb1_option_0');
    fireEvent.keyDown(menu, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('cb1_option_1');
    fireEvent.keyDown(menu, { keyCode: 38 });
    expect(input.getAttribute('aria-activedescendant')).toBe('cb1_option_0');
  });

  test('Typing in the input opens the menu and shows the option', () => {
    const { getByPlaceholderText, getByText } = render(
      <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
    );
    const input = getByPlaceholderText('Combobox test');
    userEvent.type(input, 'A');
    expect(getByText('Apple')).toBeInTheDocument();
  });

  test('Typing in the input opens the menu and shows the option when itemFormatter is used', () => {
    const data = [
      {
        label: 'Apple',
        description: 'A fruit',
      },
    ];
    const { getByPlaceholderText, getByText } = render(
      <Combobox
        id="cb1"
        items={data}
        placeholder="Combobox test"
        keyToSearch="label"
        itemFormatter={(index): ReactElement => (
          <div>
            <span>{data[index].label}</span> <br />
            <span>{data[index].description}</span>
          </div>
        )}
      />,
    );
    const input = getByPlaceholderText('Combobox test');
    userEvent.type(input, 'A');
    expect(getByText('Apple')).toBeInTheDocument();
  });

  test('Typing in the input opens the menu and then closes it', () => {
    const { getByPlaceholderText, queryByRole } = render(
      <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
    );
    const input = getByPlaceholderText('Combobox test');
    userEvent.type(input, 'A');
    // Reset value to nothing
    fireEvent.change(input, { target: { value: '' } });
    const menu = queryByRole('listbox');
    expect(menu).not.toBeInTheDocument();
  });

  test('Pressing enter on a item changes the inputs value', () => {
    const { getByPlaceholderText } = render(
      <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
    );
    const input = getByPlaceholderText('Combobox test');
    userEvent.type(input, 'A');
    fireEvent.keyDown(input, { keyCode: 40 });
    fireEvent.keyDown(input, { keyCode: 13 });
    waitFor(() => {
      expect(input).toHaveValue('Apple');
    });
  });

  test('Pressing enter on a item changes the inputs value with item formatter', () => {
    const data = [
      {
        label: 'Apple',
        description: 'A fruit',
      },
    ];
    const { getByPlaceholderText } = render(
      <Combobox
        id="cb1"
        items={data}
        placeholder="Combobox test"
        keyToSearch="label"
        itemFormatter={(index): ReactElement => (
          <div>
            <span>{data[index].label}</span> <br />
            <span>{data[index].description}</span>
          </div>
        )}
      />,
    );
    const input = getByPlaceholderText('Combobox test');
    userEvent.type(input, 'A');
    fireEvent.keyDown(input, { keyCode: 40 });
    fireEvent.keyDown(input, { keyCode: 13 });
    waitFor(() => {
      expect(input).toHaveValue('Apple');
    });
  });

  test('Pressing any key besides enter does not select the item', () => {
    const { getByPlaceholderText, getByText } = render(
      <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
    );
    const input = getByPlaceholderText('Combobox test');
    userEvent.type(input, 'A');
    const option = getByText('Apple');
    fireEvent.keyDown(option, { key: 'a', keyCode: 'KeyA' });
    expect(input).toHaveValue('A');
  });

  test('Mousing over the option sets the correct active descent for the input', () => {
    const { getByPlaceholderText, getByText } = render(
      <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
    );
    const input = getByPlaceholderText('Combobox test');
    userEvent.type(input, 'A');
    const option = getByText('Apple');
    fireEvent.mouseEnter(option);
    waitFor(() => {
      expect(input.getAttribute('aria-activedescendant')).toBe('cb1_option_0');
    });
  });

  test('If nothing is found then show the empty state', () => {
    const { getByPlaceholderText, getByText } = render(
      <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
    );
    const input = getByPlaceholderText('Combobox test');
    userEvent.type(input, 'Hello');
    expect(getByText('Nothing found')).toBeInTheDocument();
  });

  test('The check icon is on a selected item', () => {
    const { getByPlaceholderText, getByText, getAllByRole } = render(
      <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
    );
    const input = getByPlaceholderText('Combobox test');
    userEvent.type(input, 'A');
    const item = getByText('Apple');
    fireEvent.mouseDown(item);
    fireEvent.change(input, { target: { value: '' } });
    userEvent.type(input, 'A');
    const svg = getAllByRole('img')[0];
    expect(svg).toHaveClass('check-circle');
  });

  test('Check icon shows up for the item selected in dark mode correctly', () => {
    const { getByPlaceholderText, getByText, getAllByRole } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Combobox id="cb1" placeholder="Combobox test" items={['Apple', 'Orange', 'Pear']} />,
      </FCThemeProvider>,
    );
    const input = getByPlaceholderText('Combobox test');
    userEvent.type(input, 'a');
    const item = getByText('Apple');
    fireEvent.mouseDown(item);
    fireEvent.click(input);
    const svg = getAllByRole('img')[0];
    expect(svg).toHaveClass('check-circle');
  });
});
