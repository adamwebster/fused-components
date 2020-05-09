import React from 'react';
import { render, cleanup, fireEvent, waitFor, screen } from '@testing-library/react';
import 'jest-styled-components';
import { DropdownButton } from './index';
import { Icon } from '../../icon';
import { FCThemeProvider } from '../../../theming/FCTheme';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

describe('Dropdown Button Tests', () => {
  test('Renders the Dropdown Button component', () => {
    const { getByText } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    expect(getByText('Dropdown Button')).toBeInTheDocument();
  });

  test('To match snapshot', () => {
    const { getByText } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
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
            <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
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
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
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
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(getByRole('menu')).toBeInTheDocument();
  });

  test('The menu closes when escape is clicked', () => {
    jest.useFakeTimers();
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
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
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(screen.queryByRole('menu')).toBeNull();
  });

  test('Clicking the down arrow changes the selected menu item', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
          <DropdownButton.MenuItem key="2">Menu Item</DropdownButton.MenuItem>
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

  test('Clicking the down arrow on the last item does not change the selected menu item', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
          <DropdownButton.MenuItem key="2">Menu Item</DropdownButton.MenuItem>
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
      fireEvent.keyDown(menu, { key: 'ArrowDown' });
    });
    expect(menu.getAttribute('aria-activedescendant')).toBe('dm1_menuitem_1');
  });

  test('Clicking the up arrow on the last item does not change the selected menu item', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
          <DropdownButton.MenuItem key="2">Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.keyDown(button, { key: 'Enter' });
    const menu = getByRole('menu');
    expect(menu).toBeInTheDocument();
    fireEvent.focus(menu);
    act(() => {
      fireEvent.keyDown(menu, { key: 'ArrowUp' });
    });
    expect(menu.getAttribute('aria-activedescendant')).toBe('dm1_menuitem_0');
  });

  test('Clicking the up arrow changes the selected menu item', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
          <DropdownButton.MenuItem key="2">Menu Item 2</DropdownButton.MenuItem>
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

    act(() => {
      fireEvent.keyDown(menu, { key: 'ArrowUp' });
    });
    expect(menu.getAttribute('aria-activedescendant')).toBe('dm1_menuitem_0');
  });

  test('The menu shows when the down arrow is clicked', () => {
    const { getByText, getByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
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
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
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
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
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
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
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
    jest.useFakeTimers();

    const { getByText, queryByRole } = render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = getByText('Dropdown Button');
    fireEvent.click(button);
    fireEvent.click(button);

    act(() => {
      jest.advanceTimersByTime(400);
    });
    await waitFor(
      () => {
        const menu = queryByRole('menu');
        expect(menu).toBeFalsy();
      },
      { timeout: 400 },
    );
  });

  test('Clicking outside the menu closes the menu', async () => {
    jest.useFakeTimers();
    const { getByText, queryByRole } = render(
      <>
        <button>Click me</button>
        <DropdownButton id="dm1" label="Dropdown Button">
          <DropdownButton.Menu>
            <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
          </DropdownButton.Menu>
        </DropdownButton>
      </>,
    );
    const button = getByText('Dropdown Button');
    const outSideButton = getByText('Click me');

    fireEvent.click(button);
    fireEvent.mouseDown(outSideButton);
    act(() => {
      jest.advanceTimersByTime(400);
    });

    const menu = queryByRole('menu');
    expect(menu).toBeFalsy();
  });

  test('Renders the Dropdown Button component when render as a is set', () => {
    const { getByRole } = render(
      <DropdownButton id="dm1" as="a" label={<Icon icon="times" />}>
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1" icon="check-circle">
            Like
          </DropdownButton.MenuItem>
          <DropdownButton.MenuItem key="2">Unlike</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    expect(getByRole('img')).toBeInTheDocument();
  });

  test('Renders correctly with a Divider', () => {
    render(
      <DropdownButton id="dm1" as="a" label="Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1" icon="check-circle">
            Like
          </DropdownButton.MenuItem>
          <DropdownButton.Divider key="Divider" />
        </DropdownButton.Menu>
      </DropdownButton>,
    );

    const button = screen.getByText('Button');
    userEvent.click(button);
    expect(screen.getByRole('presentation', { hidden: true })).toBeInTheDocument();
  });

  test('Mousing over an item shows the correct active descendant', () => {
    render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem aria-label="test" key="1">
            Menu Item
          </DropdownButton.MenuItem>
          <DropdownButton.MenuItem key="2">Menu Item 2</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = screen.getByText('Dropdown Button');
    userEvent.click(button);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    const item = screen.getByText('Menu Item 2');
    fireEvent.mouseOver(item);
    expect(screen.getByRole('menu').getAttribute('aria-activedescendant')).toBe('dm1_menuitem_1');
  });

  test('Clicking an menu item fires the onClick function', async () => {
    let value = 'Hello';
    const onClick = jest.fn(() => {
      value = 'World';
    });
    render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem onClick={() => onClick()} key="1">
            Menu Item
          </DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = screen.getByText('Dropdown Button');
    fireEvent.click(button);
    const item = screen.getByText('Menu Item');
    fireEvent.click(item);
    expect(value).toBe('World');
  });

  test('Pressing enter an menu item fires the onClick function', async () => {
    let value = 'Hello';
    const onClick = jest.fn(() => {
      value = 'World';
    });
    render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem onClick={() => onClick()} key="1">
            Menu Item
          </DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = screen.getByText('Dropdown Button');
    fireEvent.click(button);
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Enter' });
    expect(value).toBe('World');
  });

  test('Value does not change if item does not have onClick function', async () => {
    const value = 'Hello';

    render(
      <DropdownButton id="dm1" label="Dropdown Button">
        <DropdownButton.Menu>
          <DropdownButton.MenuItem key="1">Menu Item</DropdownButton.MenuItem>
        </DropdownButton.Menu>
      </DropdownButton>,
    );
    const button = screen.getByText('Dropdown Button');
    fireEvent.click(button);
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Enter' });
    expect(value).toBe('Hello');
  });
});
