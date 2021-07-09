import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import 'jest-styled-components';
import { Panel } from './index';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Panel Tests', () => {
  test('Renders the Panel component', () => {
    const { getByText } = render(<Panel id="1">I am a Panel</Panel>);
    expect(getByText('I am a Panel')).toBeInTheDocument();
  });

  test('Clicking the close (times) button closes the panel', async () => {
    let visible = true;
    const setVisible = jest.fn(() => {
      visible = false;
    });
    const { getByTitle, queryByText, rerender } = render(
      <Panel id="1" visible={visible} onCloseClick={() => setVisible()}>
        Panel test
      </Panel>,
    );

    const closeButton = getByTitle('Close panel');
    fireEvent.click(closeButton);
    expect(visible).toBe(false);

    rerender(
      <Panel id="1" visible={visible} onCloseClick={() => setVisible()}>
        Panel test
      </Panel>,
    );

    await waitFor(
      () => {
        expect(queryByText('Panel test')).toBeFalsy();
      },
      { timeout: 600 },
    );
  });

  test('Clicking the close button closes the panel', async () => {
    let visible = true;
    const setVisible = jest.fn(() => {
      visible = false;
    });
    const { getByText, queryByText, rerender } = render(
      <Panel id="1" visible={visible} onCloseClick={() => setVisible()}>
        Panel test
      </Panel>,
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);
    expect(visible).toBe(false);
    rerender(
      <Panel id="1" visible={visible} onCloseClick={() => setVisible()}>
        Panel test
      </Panel>,
    );

    await waitFor(
      () => {
        expect(queryByText('Panel test')).toBeFalsy();
      },
      { timeout: 600 },
    );
  });

  test('Clicking the save button closes the panel', async () => {
    let visible = true;
    const setVisible = jest.fn(() => {
      visible = false;
    });
    const { getByText, queryByText, rerender } = render(
      <Panel id="1" visible={visible} onSaveClick={() => setVisible()}>
        Panel test
      </Panel>,
    );

    const closeButton = getByText('Save');
    fireEvent.click(closeButton);
    expect(visible).toBe(false);
    rerender(
      <Panel id="1" visible={visible} onSaveClick={() => setVisible()}>
        Panel test
      </Panel>,
    );

    await waitFor(
      () => {
        expect(queryByText('Panel test')).toBeFalsy();
      },
      { timeout: 600 },
    );
  });

  test('Clicking the overlay closes the panel', async () => {
    let visible = true;
    const setVisible = jest.fn(() => {
      visible = false;
    });
    const { getByTestId, queryByText, rerender } = render(
      <Panel id="1" visible={visible} showOverlay onCloseClick={() => setVisible()}>
        Panel test
      </Panel>,
    );

    const overlay = getByTestId('panel-overlay');
    fireEvent.click(overlay);
    expect(visible).toBe(false);
    rerender(
      <Panel id="1" visible={visible} showOverlay onCloseClick={() => setVisible()}>
        Panel test
      </Panel>,
    );

    await waitFor(
      () => {
        expect(queryByText('Panel test')).toBeFalsy();
      },
      { timeout: 600 },
    );
  });

  test('Clicking a button shows the panel', async () => {
    let visible = false;
    const setVisible = jest.fn(() => {
      visible = true;
    });
    const { getByText, queryByText, rerender } = render(
      <>
        <button onClick={() => setVisible()}>Show panel</button>
        <Panel id="1" visible={visible} showOverlay>
          Panel test
        </Panel>
      </>,
    );

    const button = getByText('Show panel');
    fireEvent.click(button);
    expect(visible).toBe(true);
    rerender(
      <Panel id="1" visible={visible} showOverlay>
        Panel test
      </Panel>,
    );

    await waitFor(
      () => {
        expect(queryByText('Panel test')).toBeTruthy();
      },
      { timeout: 600 },
    );
  });

  test('Position is set to relative when fixed is set to false', () => {
    const { getByRole } = render(
      <Panel id="1" visible={true} fixed={false}>
        Panel
      </Panel>,
    );
    expect(getByRole('dialog')).toHaveStyleRule('position', 'relative');
  });

  test('CSS left property is used when position is set to left', () => {
    const { getByRole } = render(
      <Panel id="1" visible={true} position="left">
        Panel
      </Panel>,
    );
    expect(getByRole('dialog')).toHaveStyleRule('left', '25px');
  });

  test('CSS left property is used when position is set to left', () => {
    const { getByRole } = render(
      <Panel id="1" visible={true} position="right">
        Panel
      </Panel>,
    );
    expect(getByRole('dialog')).toHaveStyleRule('right', '25px');
  });

  test('Setting the title prop sets the title', () => {
    const { getByText } = render(
      <Panel id="1" visible={true} title="Title">
        Panel
      </Panel>,
    );
    expect(getByText('Title')).toBeInTheDocument();
  });

  test('Setting the title prop sets the title', () => {
    const { container } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Panel id="1" visible={true} title="Title">
          Panel
        </Panel>
      </FCThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Correct styles for danger panel', () => {
    const { container } = render(
      <Panel id="1" visible={true} title="Title" fcStyle="danger">
        Panel
      </Panel>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Correct styles for warning panel', () => {
    const { container } = render(
      <Panel id="1" visible={true} title="Title" fcStyle="warning">
        Panel
      </Panel>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Correct styles for info panel', () => {
    const { container } = render(
      <Panel id="1" visible={true} title="Title" fcStyle="info">
        Panel
      </Panel>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Correct styles for success panel', () => {
    const { container } = render(
      <Panel id="1" visible={true} title="Title" fcStyle="success">
        Panel
      </Panel>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Correct styles for danger panel | Dark mode', () => {
    const { container } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Panel id="1" visible={true} title="Title" fcStyle="danger">
          Panel
        </Panel>{' '}
      </FCThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Correct styles for warning panel | Dark mode', () => {
    const { container } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Panel id="1" visible={true} title="Title" fcStyle="warning">
          Panel
        </Panel>{' '}
      </FCThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Correct styles for info panel | Dark mode', () => {
    const { container } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Panel id="1" visible={true} title="Title" fcStyle="info">
          Panel
        </Panel>{' '}
      </FCThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Correct styles for success panel | Dark mode', () => {
    const { container } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Panel id="1" visible={true} title="Title" fcStyle="success">
          Panel
        </Panel>
      </FCThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
