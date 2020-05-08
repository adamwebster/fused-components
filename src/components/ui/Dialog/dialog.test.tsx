import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Dialog } from './index';
import { FCThemeProvider } from '../../../theming/FCTheme';

afterEach(cleanup);

describe('Dialog Tests', () => {
  test('Renders the Dialog component', () => {
    const { getByText } = render(
      <Dialog id="1" visible={true}>
        I am a dialog
      </Dialog>,
    );
    expect(getByText('I am a dialog')).toBeInTheDocument();
  });

  test('Clicking the overlay closes the dialog', () => {
    let visible = true;
    const setVisible = jest.fn(() => {
      visible = false;
    });
    const { getByTestId, queryByText, rerender } = render(
      <Dialog id="1" visible={visible} onCloseClick={() => setVisible()}>
        Dialog
      </Dialog>,
    );

    const overlay = getByTestId('dialog-overlay');
    fireEvent.click(overlay);
    expect(visible).toBe(false);

    rerender(
      <Dialog id="1" visible={visible} onCloseClick={() => setVisible()}>
        Dialog
      </Dialog>,
    );

    expect(queryByText('I am a dialog')).toBeFalsy();
  });

  test('Clicking the close button closes the dialog', () => {
    let visible = true;
    const setVisible = jest.fn(() => {
      visible = false;
    });
    const { getByTitle, queryByText, rerender } = render(
      <Dialog id="1" visible={visible} onCloseClick={() => setVisible()}>
        Dialog
      </Dialog>,
    );

    const closeButton = getByTitle('Close dialog');
    fireEvent.click(closeButton);
    expect(visible).toBe(false);

    rerender(
      <Dialog id="1" visible={visible} onCloseClick={() => setVisible()}>
        Dialog
      </Dialog>,
    );

    expect(queryByText('I am a dialog')).toBeFalsy();
  });

  test('Clicking the cancel button closes the dialog', () => {
    let visible = true;
    const setVisible = jest.fn(() => {
      visible = false;
    });
    const { getByText, queryByText, rerender } = render(
      <Dialog id="1" visible={visible} onCloseClick={() => setVisible()}>
        Dialog
      </Dialog>,
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(visible).toBe(false);

    rerender(
      <Dialog id="1" visible={visible} onCloseClick={() => setVisible()}>
        Dialog
      </Dialog>,
    );

    expect(queryByText('I am a dialog')).toBeFalsy();
  });

  test('Setting the box shadow property to false hides the shadow', () => {
    const { getByRole } = render(
      <Dialog id="1" visible boxShadow={false}>
        Dialog
      </Dialog>,
    );
    expect(getByRole('dialog')).toHaveStyleRule('box-shadow', undefined);
  });

  test('Able to change the confirm text', () => {
    const { getByText } = render(
      <Dialog id="1" visible confirmText="Click me">
        Dialog
      </Dialog>,
    );
    expect(getByText('Click me')).toBeInTheDocument();
  });

  test('Position is set to relative when fixed is set to false', () => {
    const { getByRole } = render(
      <Dialog id="1" visible={true} fixed={false}>
        Dialog
      </Dialog>,
    );
    expect(getByRole('dialog')).toHaveStyleRule('position', 'relative');
  });

  test('Position is set to relative when fixed is set to false', () => {
    const { getByRole } = render(
      <Dialog id="1" visible={true} fixed={false}>
        Dialog
      </Dialog>,
    );
    expect(getByRole('dialog')).toHaveStyleRule('position', 'relative');
  });

  test('Has the correct styles fcStyle is set to danger', () => {
    const { getByRole } = render(
      <Dialog id="1" visible={true} fcStyle="danger">
        Dialog
      </Dialog>,
    );
    expect(getByRole('dialog')).toMatchSnapshot();
  });

  test('Has the correct styles fcStyle is set to warning', () => {
    const { getByRole } = render(
      <Dialog id="1" visible={true} fcStyle="warning">
        Dialog
      </Dialog>,
    );
    expect(getByRole('dialog')).toMatchSnapshot();
  });

  test('Has the correct styles fcStyle is set to info', () => {
    const { getByRole } = render(
      <Dialog id="1" visible={true} fcStyle="info">
        Dialog
      </Dialog>,
    );
    expect(getByRole('dialog')).toMatchSnapshot();
  });

  test('Has the correct styles fcStyle is set to success', () => {
    const { getByRole } = render(
      <Dialog id="1" visible={true} fcStyle="success">
        Dialog
      </Dialog>,
    );
    expect(getByRole('dialog')).toMatchSnapshot();
  });

  test('Has the correct styles for the default option', () => {
    const { getByRole } = render(
      <Dialog id="1" visible={true}>
        Dialog
      </Dialog>,
    );
    expect(getByRole('dialog')).toMatchSnapshot();
  });

  test('Has the correct styles fcStyle is set to danger | dark mode', () => {
    const { getByRole } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Dialog id="1" visible={true} fcStyle="danger">
          Dialog
        </Dialog>
      </FCThemeProvider>,
    );
    expect(getByRole('dialog')).toMatchSnapshot();
  });

  test('Has the correct styles fcStyle is set to warning | dark mode', () => {
    const { getByRole } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Dialog id="1" visible={true} fcStyle="warning">
          Dialog
        </Dialog>
      </FCThemeProvider>,
    );
    expect(getByRole('dialog')).toMatchSnapshot();
  });

  test('Has the correct styles fcStyle is set to info | dark mode', () => {
    const { getByRole } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Dialog id="1" visible={true} fcStyle="info">
          Dialog
        </Dialog>
      </FCThemeProvider>,
    );
    expect(getByRole('dialog')).toMatchSnapshot();
  });

  test('Has the correct styles fcStyle is set to success | dark mode', () => {
    const { getByRole } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Dialog id="1" visible={true} fcStyle="success">
          Dialog
        </Dialog>
      </FCThemeProvider>,
    );
    expect(getByRole('dialog')).toMatchSnapshot();
  });

  test('Has the correct styles for the default option | dark mode', () => {
    const { getByRole } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <Dialog id="1" visible={true}>
          Dialog
        </Dialog>
      </FCThemeProvider>,
    );
    expect(getByRole('dialog')).toMatchSnapshot();
  });
});
