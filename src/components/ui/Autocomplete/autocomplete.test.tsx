import React, { ReactElement } from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import { Autocomplete } from './index';
import userEvent from '@testing-library/user-event';
import { FCThemeProvider } from '../../../theming/FCTheme';
import { color } from '../../../styles/styles';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);

describe('Autocomplete Tests', () => {
  test.skip('Renders Autocomplete with placeholder', () => {
    const { getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'AnotherItem']} placeholder="Autocomplete test" />,
    );
    expect(getByPlaceholderText('Autocomplete test')).toBeInTheDocument();
  });

  test.skip('Menu opens when input is typed into and has content', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Autocomplete id="ac1" items={['Test', 'Another Item']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');
    act(() => {
      userEvent.type(input, 't');
    });
    await waitFor(() => {
      expect(getByText('Another Item')).toBeInTheDocument();
    });
  });

  test.skip('Menu closes when the escape key is clicked', () => {
    const { getByPlaceholderText, queryByText } = render(
      <Autocomplete id="ac1" items={['Test', 'Another Item']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 't');
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape', keyCode: 27 });
    expect(queryByText('Another Item')).toBeFalsy();
  });

  test.skip('Menu closes when the tab key is clicked', () => {
    const { getByPlaceholderText, queryByText } = render(
      <Autocomplete id="ac1" items={['Test', 'Another Item']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');
    userEvent.type(input, 't');
    fireEvent.keyDown(input, { key: 'Tab', code: 'Tab', keyCode: 9 });
    expect(queryByText('Another Item')).toBeFalsy();
  });

  test.skip('itemFormatter renders the menu items', async () => {
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
    await waitFor(() => {
      expect(getByText('Apple')).toBeInTheDocument();
      expect(getByText('A fruit')).toBeInTheDocument();
    });
  });

  test.skip('Clicking the down arrow highlights the correct item in the menu', async () => {
    const { getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 't');

    fireEvent.keyDown(input, { keyCode: 40 });

    await waitFor(() => {
      expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
    });
  });

  test.skip('Clicking the down arrow twice and then up highlights the correct item in the menu', async () => {
    const { getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 't');

    fireEvent.keyDown(input, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
    fireEvent.keyDown(input, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_1');
    fireEvent.keyDown(input, { keyCode: 38 });
    await waitFor(() => {
      expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
    });
  });

  test.skip('Pressing up and down changes the items in the menu when itemFormatter is used', async () => {
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
    const { getByPlaceholderText } = render(
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

    fireEvent.keyDown(input, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
    fireEvent.keyDown(input, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_1');
    fireEvent.keyDown(input, { keyCode: 38 });
    await waitFor(() => {
      expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
    });
  });

  test.skip('The mouse entering the item sets the aria-activedescendant', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );

    const input = getByPlaceholderText('Autocomplete test');
    userEvent.type(input, 'T');
    const item = getAllByRole('option')[0];

    fireEvent.mouseEnter(item);
    await waitFor(() => {
      expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
    });
  });

  test.skip('The mouse entering the item sets the aria-activedescendant when itemFormatter is used', async () => {
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
    await waitFor(() => {
      expect(input.getAttribute('aria-activedescendant')).toBe('ac1_option_0');
    });
  });

  test.skip('If the input has a value an then is removed then the menu should not be shown', () => {
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

  test.skip('On change function fires when text changes', async () => {
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
    await waitFor(() => {
      expect(initialValue).toBe('two');
    });
  });

  test.skip('If the input has a value an then is removed then the menu should not be shown', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete id="ac1" clearValueOnSelect items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'tes');

    const Option = getByText('Test');
    fireEvent.click(Option);
    await waitFor(() => {
      expect(input.getAttribute('value')).toBe('');
    });
  });

  test.skip('The value of the input is set when an item from thee menu is clicked', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'tes');

    const Option = getByText('Test');
    fireEvent.click(Option);
    expect(input.getAttribute('value')).toBe('Test');
  });

  test.skip('When an item is selected by clicking enter the value is set', async () => {
    const { getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'tes');
    fireEvent.keyDown(input, { keyCode: 40 });

    fireEvent.keyDown(input, { keyCode: 13 });
    await waitFor(() => {
      expect(input.getAttribute('value')).toBe('Test');
    });
  });

  test.skip('Nothing happens When any key but enter is clicked when an item is active in the list', async () => {
    const { getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'tes');

    fireEvent.keyDown(input, { key: 'a', keyCode: 'KeyA' });
    await waitFor(() => {
      expect(input.getAttribute('value')).toBe('tes');
    });
  });

  test.skip('When an item is selected by clicking enter the value is set when itemFormatter is used', async () => {
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
    const { getByPlaceholderText } = render(
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
    fireEvent.keyDown(input, { keyCode: 40 });
    fireEvent.keyDown(input, { keyCode: 13 });
    await waitFor(() => {
      expect(input.getAttribute('value')).toBe('Apple');
    });
  });

  test.skip('When an item is selected by clicking it the value is set when itemFormatter is used', () => {
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

  test.skip('Value is returned when onItemClick is used with itemFormatter and an item is clicked', () => {
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
    const { getAllByRole, getByPlaceholderText } = render(
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
    const Option = getAllByRole('option')[0];
    fireEvent.click(Option);
    expect(initialValue).toBe(0);
  });

  test.skip('Value is returned when onItemClick is used with itemFormatter and an item is chosen using enter', () => {
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
    const { getByPlaceholderText } = render(
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
    fireEvent.keyDown(input, { keyCode: 40 });
    fireEvent.keyDown(input, { keyCode: 13 });

    expect(initialValue).toBe(0);
  });

  test.skip('When no data is sent then the empty message shows', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={[]} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 't');
    await waitFor(() => {
      expect(getByText('Nothing found')).toBeInTheDocument();
    });
  });

  test.skip('Is disabled', () => {
    const { getByPlaceholderText } = render(
      <Autocomplete id="ac1" items={[]} disabled placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');
    expect(input).toBeDisabled();
  });

  test.skip('Check icon shows up for the item selected', async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <Autocomplete id="ac1" items={['Test', 'Another Item']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');
    userEvent.type(input, 't');
    const item = getByText('Test');
    fireEvent.click(item);
    fireEvent.change(input, { target: { value: '' } });
    userEvent.type(input, 't');
    const svg = getByRole('img');
    await waitFor(() => {
      expect(svg).toHaveClass('check-circle');
    });
  });

  test.skip('Renders in dark mode', async () => {
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
    await waitFor(() => {
      expect(noItemFound).toHaveStyleRule('color', color.medium);
    });
  });

  test.skip('Check icon shows up for the item selected in dark mode correctly', async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Autocomplete id="ac1" items={['Test', 'Another Item']} placeholder="Autocomplete test" />
      </FCThemeProvider>,
    );
    const input = getByPlaceholderText('Autocomplete test');
    userEvent.type(input, 't');
    const item = getByText('Test');
    fireEvent.click(item);
    fireEvent.change(input, { target: { value: '' } });
    userEvent.type(input, 't');
    const svg = getByRole('img');
    await waitFor(() => {
      expect(svg).toHaveClass('check-circle');
    });
  });
});
