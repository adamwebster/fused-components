import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import { DropdownButton } from './index';
import { Icon } from '../../icon';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Dropdown Button Tests', () => {
  test('Renders the Dropdown Button component', () => {
    const { getByText } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    expect(getByText('Dropdown Button')).toBeInTheDocument();
  });

  test('To match snapshot', () => {
    const { getByText } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.click(button);
    expect(getByText('Dropdown Button')).toMatchSnapshot();
  });

  test('To match snapshot dark mode', () => {
    const { getByText } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <DropdownButton id="dm1" label="Dropdown Button">
          <DropdownButton.Menu>
            <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
          </DropdownButton.Menu>
        </DropdownButton>
      </FCThemeProvider>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.click(button);
    expect(getByText('Dropdown Button')).toMatchSnapshot();
  });

  test('The menu shows when the button is clicked', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.click(button);
    expect(getByRole('listbox')).toBeInTheDocument();
  });

  test('Clicking an menu item closes the menu', async () => {
    const { getByText, queryByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.click(button);
    const item = getByText('Menu Item');

    fireEvent.click(item);
    await waitFor(
      () => {
        const menu = queryByRole('listbox');
        expect(menu).toBeFalsy();
      },
      { timeout: 300 },
    );
  });

  test('Clicking the button when the menu is open closes the menu', async () => {
    const { getByText, queryByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.click(button);
    fireEvent.click(button);

    await waitFor(
      () => {
        const menu = queryByRole('listbox');
        expect(menu).toBeFalsy();
      },
      { timeout: 300 },
    );
  });

  test('Clicking outside the menu closes the menu', async () => {
    const { getByText, queryByRole } = render(
      <>
        <button>Click me</button>
        <DropdownButton id="dm1" label="Dropdown Button">
          <DropdownButton.Menu>
            <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
          </DropdownButton.Menu>
        </DropdownButton>
      </>,
    );
    const button = getByText('Dropdown Button');
    const outSideButton = getByText('Click me');

    fireEvent.click(button);
    fireEvent.mouseDown(outSideButton);
    await waitFor(
      () => {
        const menu = queryByRole('listbox');
        expect(menu).toBeFalsy();
      },
      { timeout: 300 },
    );
  });

  test('Renders the Dropdown Button component when render as a is set', () => {
    const { getByRole } = render(
      <DropdownButton id="dm1" as="a" label={<Icon icon="times" />}>
        <DropdownButton.Menu>
          <DropdownButton.MenuItem icon="check-circle">Like</DropdownButton.MenuItem>
          <DropdownButton.MenuItem>Unlike</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    expect(getByRole('img')).toBeInTheDocument();
  });
});
