import React, { ReactElement } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
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

  test('itemFormatter renders the menu itmes', () => {
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
    expect(input.getAttribute('aria-activedescendant')).toBe('Apple');
    fireEvent.keyDown(menu, { keyCode: 40 });
    expect(input.getAttribute('aria-activedescendant')).toBe('Banana');
    fireEvent.keyDown(menu, { keyCode: 38 });
    expect(input.getAttribute('aria-activedescendant')).toBe('Apple');
  });

  test('If the input has a value an then is removed then the menu should not be shown', () => {
    const { queryByRole, getByPlaceholderText } = render(
      <Autocomplete items={['Test', 'Test2']} placeholder="Autocomplete test" />,
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
      <Autocomplete items={['Test', 'Test2']} onChange={() => onChange()} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'A');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(initialValue).toBe('two');
  });

  test('If the input has a value an then is removed then the menu should not be shown', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete clearValueOnSelect items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'tes');

    const Option = getByText('Test');
    fireEvent.click(Option);
    expect(input.getAttribute('value')).toBe('');
  });

  test('The value of the input is set when an item from thee menu is clicked', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'tes');

    const Option = getByText('Test');
    fireEvent.click(Option);
    expect(input.getAttribute('value')).toBe('Test');
  });

  test('When an item is selected by clicking enter the value is set', () => {
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete items={['Test', 'Test2']} placeholder="Autocomplete test" />,
    );
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 'tes');

    const Option = getByText('Test');
    fireEvent.keyPress(Option, { keyCode: 13 });
    expect(input.getAttribute('value')).toBe('Test');
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
    fireEvent.keyPress(Option, { keyCode: 13 });
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
    let initialValue = 'test';
    const onItemClick = () =>
      jest.fn(() => {
        initialValue = 'new test';
      });
    const { getByText, getByPlaceholderText } = render(
      <Autocomplete
        onItemClick={(): any => onItemClick()}
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
    expect(initialValue).toBe('new test');
  });

  test('When no data is sent then the empty message shows', () => {
    const { getByText, getByPlaceholderText } = render(<Autocomplete items={[]} placeholder="Autocomplete test" />);
    const input = getByPlaceholderText('Autocomplete test');

    userEvent.type(input, 't');
    expect(getByText('Nothing found')).toBeInTheDocument();
  });

  test('Is disabled', () => {
    const { getByPlaceholderText } = render(<Autocomplete items={[]} disabled placeholder="Autocomplete test" />);
    const input = getByPlaceholderText('Autocomplete test');
    expect(input).toBeDisabled();
  });
});
