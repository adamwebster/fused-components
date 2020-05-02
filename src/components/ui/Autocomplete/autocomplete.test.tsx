import React, { ReactElement } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Autocomplete } from './index';
import userEvent from '@testing-library/user-event';
import { FCThemeProvider } from '../../../theming/FCTheme';
import { color } from '../../../styles/styles';

afterEach(cleanup);

describe('Autocomplete Tests', () => {
  test('Renders Autocomplete with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'AnotherItem']} placeholder="Autocomplete test" />,
    );
    expect(getByPlaceholderText('Autocomplete test')).toBeInTheDocument();
  });

  test('Menu opens when input is typed into and has content', () => {
    const { getByPlaceholderText, getByText } = render(
      <Autocomplete id="ac1" items={['Test', 'Another Item']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');
    userEvent.type(input, 't');
    expect(getByText('Another Item')).toBeInTheDocument();
  });

  test('Menu closes when the escape key is clicked', () => {
    const { getByPlaceholderText, queryByText, container } = render(
      <Autocomplete id="ac1" items={['Test', 'Another Item']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');
    userEvent.type(input, 't');
    fireEvent.keyDown(container, { key: 'Escape', code: 'Escape', keyCode: 27 });
    expect(queryByText('Another Item')).toBeFalsy();
  });

  test('itemFormatter renders the menu items', () => {
    const data = [
      {
        label: 'Apple',
        description: 'A fruit',
      },
    ];
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete
        id="ac1"
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
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 't');
    const menu = getByRole('listbox');

    fireEvent.keyDown(menu, { keyCode: 40 });

    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
  });

  test('Clicking the down arrow twice and then up highlights the correct item in the menu', () => {
    const { getByRole, getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 't');
    const menu = getByRole('listbox');

    fireEvent.keyDown(menu, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
    fireEvent.keyDown(menu, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_1');
    fireEvent.keyDown(menu, { keyCode: 38 });
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
  });

  test('Pressing up and down changes the items in the menu when itemFormatter is used', () => {
    const data = [
      {
        label: 'Apple',
        description: 'A fruit',
      },
      {
        label: 'Banana',
        description: 'Another fruit',
      },
    ];
    const { getByRole, getByPlaceholderText } = render(
      <Autocomplete
        id="ac1"
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

    userEvent.type(input, 't');
    const menu = getByRole('listbox');

    fireEvent.keyDown(menu, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
    fireEvent.keyDown(menu, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_1');
    fireEvent.keyDown(menu, { keyCode: 38 });
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
  });

  test('The mouse entering the item sets the aria-activedescendant', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );

    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'T');
    const item = getByText('Test');

    fireEvent.mouseEnter(item);
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
  });

  test('The mouse entering the item sets the aria-activedescendant when itemFormatter is used', () => {
    const data = [
      {
        label: 'Apple',
        description: 'A fruit',
      },
      {
        label: 'Banana',
        description: 'Another fruit',
      },
    ];
    const { getAllByRole, getByPlaceholderText } = render(
      <Autocomplete
        id="ac1"
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

    userEvent.type(input, 'A');
    const item = getAllByRole('option');

    fireEvent.mouseEnter(item[0]);
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
  });

  test('If the input has a value an then is removed then the menu should not be shown', () => {
    const { queryByRole, getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'Apple');

    // Reset value to nothings
    fireEvent.change(input, { target: { value: '' } });
    const menu = queryByRole('listbox');
    expect(menu).not.toBeInTheDocument();
  });

  test('On change function fires when text changes', () => {
    let initialValue = 'One';
    const onChange = jest.fn(() => {
      initialValue = 'two';
    });
    const { getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} onChange={() => onChange()} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 't');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(initialValue).toBe('two');
  });

  test('If the input has a value an then is removed then the menu should not be shown', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete id="ac1" clearValueOnSelect items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'tes');

    const Option = getByText('Test');
    fireEvent.click(Option);
    expect(input.getAttribute('value')).toBe('');
  });

  test('The value of the input is set when an item from thee menu is clicked', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'tes');

    const Option = getByText('Test');
    fireEvent.click(Option);
    expect(input.getAttribute('value')).toBe('Test');
  });

  test('When an item is selected by clicking enter the value is set', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'tes');

    const Option = getByText('Test');
    fireEvent.keyDown(Option, { keyCode: 13 });
    expect(input.getAttribute('value')).toBe('Test');
  });

  test('Nothing happens When any key but enter is clicked when an item is active in the list', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'tes');

    const Option = getByText('Test');
    fireEvent.keyDown(Option, { key: 'a', keyCode: 'KeyA' });

    expect(input.getAttribute('value')).toBe('tes');
  });

  test('When an item is selected by clicking enter the value is set when itemFormatter is used', () => {
    const data = [
      {
        label: 'Apple',
        description: 'A fruit',
      },
      {
        label: 'Banana',
        description: 'Another fruit',
      },
    ];
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete
        id="ac1"
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

    userEvent.type(input, 'ap');

    const Option = getByText('Apple');
    fireEvent.keyDown(Option, { keyCode: 13 });
    expect(input.getAttribute('value')).toBe('Apple');
  });

  test('When an item is selected by clicking it the value is set when itemFormatter is used', () => {
    const data = [
      {
        label: 'Apple',
        description: 'A fruit',
      },
      {
        label: 'Banana',
        description: 'Another fruit',
      },
    ];
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete
        id="ac1"
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

    userEvent.type(input, 'ap');

    const Option = getByText('Apple');
    fireEvent.click(Option);
    expect(input.getAttribute('value')).toBe('Apple');
  });

  test('Value is returned when onItemClick is used with itemFormatter and an item is clicked', () => {
    const data = [
      {
        label: 'Apple',
        description: 'A fruit',
      },
      {
        label: 'Banana',
        description: 'Another fruit',
      },
    ];
    let initialValue = 1;
    const onItemClick = jest.fn(index => {
      initialValue = index;
    });
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete
        id="ac1"
        onItemClick={(index): any => onItemClick(index)}
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
    userEvent.type(input, 'ap');
    const Option = getByText('Apple');
    fireEvent.click(Option);
    expect(initialValue).toBe(0);
  });

  test('Value is returned when onItemClick is used with itemFormatter and an item is chosen using enter', () => {
    const data = [
      {
        label: 'Apple',
        description: 'A fruit',
      },
      {
        label: 'Banana',
        description: 'Another fruit',
      },
    ];
    let initialValue = 1;
    const onItemClick = jest.fn(index => {
      initialValue = index;
    });
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete
        id="ac1"
        onItemClick={(index): any => onItemClick(index)}
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
    userEvent.type(input, 'ap');
    const Option = getByText('Apple');
    fireEvent.keyDown(Option, { keyCode: 13 });
    expect(initialValue).toBe(0);
  });

  test('When no data is sent then the empty message shows', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={[]} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 't');
    expect(getByText('Nothing found')).toBeInTheDocument();
  });

  test('Is disabled', () => {
    const { getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={[]} disabled placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');
    expect(input).toBeDisabled();
  });

  test('Check icon shows up for the item selected', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <Autocomplete id="ac1" items={['Test', 'Another Item']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');
    userEvent.type(input, 't');
    const item = getByText('Test');
    fireEvent.click(item);
    userEvent.type(input, ' ');
    const svg = getByRole('img');
    expect(svg).toHaveClass('check-circle');
  });

  test('Renders in dark mode', () => {
    const { getByRole, getByPlaceholderText, getByText } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Autocomplete id="ac1" placeholder="autocomplete" items={['Test', 'Test2']} />
      </FCThemeProvider>,
    );
    const input = getByPlaceholderText('autocomplete');
    userEvent.type(input, 'test');
    const menu = getByRole('listbox');
    expect(menu).toHaveStyleRule('background-color', color.darkModeDark);
    userEvent.type(input, 'testfff');
    const noItemFound = getByText('Nothing found');
    expect(noItemFound).toHaveStyleRule('color', color.medium);
  });

  test('Check icon shows up for the item selected in dark mode correctly', () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Autocomplete id="ac1" items={['Test', 'Another Item']} placeholder="Autocomplete test" />
      </FCThemeProvider>,
    );
    const input = getByPlaceholderText('Autocomplete test');
    userEvent.type(input, 't');
    const item = getByText('Test');
    fireEvent.click(item);
    userEvent.type(input, ' ');
    const svg = getByRole('img');
    expect(svg).toHaveClass('check-circle');
  });
});
