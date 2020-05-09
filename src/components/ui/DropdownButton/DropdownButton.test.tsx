import React from 'react';
import { render, cleanup, fireEvent, waitFor, screen } from '@testing-library/react';
import 'jest-styled-components';
import { DropdownButton } from './index';
import { Icon } from '../../icon';
import { FCThemeProvider } from '../../../theming/FCTheme';
import { act } from 'react-dom/test-utils';

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
    expect(getByRole('menu')).toBeInTheDocument();
  });

  test('The menu shows when the button is activated by pressing enter', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(getByRole('menu')).toBeInTheDocument();
  });

  test('The menu closes when escape is clicked', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.keyDown(button, { key: 'Enter' });
    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();
    fireEvent.focus(menu);
    act(() => {
      fireEvent.keyDown(menu, { key: 'Escape' });
    });
    expect(screen.queryByRole('menu')).toBeNull();
  });

  test('Clicking the down arrow changes the selected menu item', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.keyDown(button, { key: 'Enter' });
    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();
    fireEvent.focus(menu);
    act(() => {
      fireEvent.keyDown(menu, { key: 'ArrowDown' });
    });
    expect(menu.getAttribute('aria-activedescendant')).toBe('dm1_menuitem_1');
  });

  test('Clicking the up arrow changes the selected menu item', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.keyDown(button, { key: 'Enter' });
    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();
    fireEvent.focus(menu);
    act(() => {
      fireEvent.keyDown(menu, { key: 'ArrowDown' });
    });
    act(() => {
      fireEvent.keyDown(menu, { key: 'ArrowUp' });
    });
    expect(menu.getAttribute('aria-activedescendant')).toBe('dm1_menuitem_0');
  });

  test('The menu shows when the down arrow is clicked', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    act(() => {
      fireEvent.keyDown(button, { key: 'ArrowDown' });
    });
    expect(getByRole('menu')).toBeInTheDocument();
  });

  test('The menu does not show when a not defined key is pressed', () => {
    const { getByText, queryByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    act(() => {
      fireEvent.keyDown(button, { key: 'a' });
    });
    expect(queryByRole('menu')).toBeNull();
  });

  test('The menu shows when the button is activated by pressing enter', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem>Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(getByRole('menu')).toBeInTheDocument();
  });
  test('Clicking an menu item closes the menu', async () => {
    jest.useFakeTimers();

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
    act(() => {
      jest.advanceTimersByTime(400);
    });
    await waitFor(
      () => {
        const menu = queryByRole('menu');
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
        const menu = queryByRole('menu');
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

  test('Renders correctly with a Divider', () => {
    render(
      <DropdownButton id="dm1" as="a" label={<Icon icon="times" />}>
        <DropdownButton.Menu>
          <DropdownButton.MenuItem icon="check-circle">Like</DropdownButton.MenuItem>
          <DropdownButton.Divider />
        </DropdownButton.Menu>
      </DropdownButton>,
    );
  });
});
