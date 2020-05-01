import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange } from '@testing-library/react';
import 'jest-styled-components';
import { CornerDialog } from './index';
import { color } from '../../../styles/styles';
import { FCThemeProvider } from '../../../theming/FCTheme';
import { lighten } from 'polished';

afterEach(cleanup);

describe('Corner Dialog Tests', () => {
  test('Renders the Corner Dialog component', () => {
    const { getByText } = render(<CornerDialog>I am a corner dialog</CornerDialog>);
    expect(getByText('I am a corner dialog')).toBeInTheDocument();
  });

  test('Dialog closes on cancel click', async () => {
    let visible = true;
    const cancelClick = jest.fn(() => {
      visible = false;
    });
    const { getByText, rerender, queryByText } = render(
      <CornerDialog onCloseClick={() => cancelClick()} visible={visible}>
        I am a corner dialog
      </CornerDialog>,
    );
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(cancelClick).toHaveBeenCalledTimes(1);
    expect(visible).toBe(false);
    rerender(
      <CornerDialog onCloseClick={() => cancelClick()} visible={visible}>
        I am a corner dialog
      </CornerDialog>,
    );
    await waitForDomChange();
    expect(queryByText('I am a corner dialog')).toBeFalsy();
  });

  test('Dialog closes on confirm click', async () => {
    let visible = true;
    const confirmClick = jest.fn(() => {
      visible = false;
    });
    const { getByText, rerender, queryByText } = render(
      <CornerDialog visible={visible} onConfirmClick={() => confirmClick()}>
        I am a corner dialog
      </CornerDialog>,
    );
    const confirmButton = getByText('Learn More');
    fireEvent.click(confirmButton);
    expect(confirmClick).toHaveBeenCalledTimes(1);
    expect(visible).toBe(false);
    rerender(
      <CornerDialog onConfirmClick={() => confirmClick()} visible={visible}>
        I am a corner dialog
      </CornerDialog>,
    );
    await waitForDomChange();
    expect(queryByText('I am a corner dialog')).toBeFalsy();
  });
  test('Dialog closes on close button click', async () => {
    let visible = true;
    const closeClick = jest.fn(() => {
      visible = false;
    });
    const { getByTitle, rerender, queryByText } = render(
      <CornerDialog visible={visible} onCloseClick={() => closeClick()}>
        I am a corner dialog
      </CornerDialog>,
    );
    const closeButton = getByTitle('Close');
    fireEvent.click(closeButton);
    expect(closeClick).toHaveBeenCalledTimes(1);
    expect(visible).toBe(false);
    rerender(
      <CornerDialog onCloseClick={() => closeClick()} visible={visible}>
        I am a corner dialog
      </CornerDialog>,
    );
    await waitForDomChange();
    expect(queryByText('I am a corner dialog')).toBeFalsy();
  });

  test('It renders if fixed is set to false', () => {
    const { getByText } = render(<CornerDialog fixed={false}>I am a corner dialog</CornerDialog>);
    expect(getByText('I am a corner dialog')).toBeInTheDocument();
  });

  test('Able to change the cancelText', () => {
    const { getByText } = render(
      <CornerDialog cancelText="Hey click here to close">I am a corner dialog</CornerDialog>,
    );
    expect(getByText('Hey click here to close')).toBeInTheDocument();
  });
  test('Able to change the confirm', () => {
    const { getByText } = render(
      <CornerDialog confirmText="Hey click here to confirm">I am a corner dialog</CornerDialog>,
    );
    expect(getByText('Hey click here to confirm')).toBeInTheDocument();
  });
  test('Able to set a title', () => {
    const { getByText } = render(
      <CornerDialog title="Hey I am a title" confirmText="Hey click here to confirm">
        I am a corner dialog
      </CornerDialog>,
    );
    expect(getByText('Hey I am a title')).toBeInTheDocument();
  });

  test('Able to set a icon', () => {
    const { getAllByRole } = render(
      <CornerDialog icon="check-circle" title="Hey I am a title" confirmText="Hey click here to confirm">
        I am a corner dialog
      </CornerDialog>,
    );
    const icon = getAllByRole('img')[1];
    expect(icon).toHaveClass('check-circle');
  });

  test('Cancel button has the correct color for light theme', () => {
    const { getByText } = render(<CornerDialog>I am a corner dialog</CornerDialog>);
    const button = getByText('Cancel');
    expect(button).toHaveStyleRule('color', color.mediumdark);
  });

  test('Cancel button has the correct color for dark theme', () => {
    const { getByText } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <CornerDialog>I am a corner dialog</CornerDialog>
      </FCThemeProvider>,
    );
    const button = getByText('Cancel');
    expect(button).toHaveStyleRule('color', color.darkModeLight);
  });

  test('Renders when fcStyle is set to danger', () => {
    const { getByText } = render(
      <CornerDialog title="Title" fcStyle="danger">
        I am a corner dialog
      </CornerDialog>,
    );
    const title = getByText('Title');
    expect(title).toHaveStyleRule('color', color.danger);
  });

  test('Renders when fcStyle is set to warning', () => {
    const { getByText } = render(
      <CornerDialog title="Title" fcStyle="warning">
        I am a corner dialog
      </CornerDialog>,
    );
    const title = getByText('Title');
    expect(title).toHaveStyleRule('color', color.warning);
  });

  test('Renders when fcStyle is set to info', () => {
    const { getByText } = render(
      <CornerDialog title="Title" fcStyle="info">
        I am a corner dialog
      </CornerDialog>,
    );
    const title = getByText('Title');
    expect(title).toHaveStyleRule('color', color.info);
  });

  test('Renders when fcStyle is set to success', () => {
    const { getByText } = render(
      <CornerDialog title="Title" fcStyle="success">
        I am a corner dialog
      </CornerDialog>,
    );
    const title = getByText('Title');
    expect(title).toHaveStyleRule('color', color.success);
  });

  test('Renders when fcStyle is set to danger | dark mode', () => {
    const { getByText } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <CornerDialog title="Title" fcStyle="danger">
          I am a corner dialog
        </CornerDialog>
      </FCThemeProvider>,
    );
    const title = getByText('Title');
    expect(title).toHaveStyleRule('color', lighten(0.1, color.danger));
  });

  test('Renders when fcStyle is set to warning | dark mode', () => {
    const { getByText } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <CornerDialog title="Title" fcStyle="warning">
          I am a corner dialog
        </CornerDialog>
      </FCThemeProvider>,
    );
    const title = getByText('Title');
    expect(title).toHaveStyleRule('color', lighten(0.1, color.warning));
  });

  test('Renders when fcStyle is set to info | dark mode', () => {
    const { getByText } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <CornerDialog title="Title" fcStyle="info">
          I am a corner dialog
        </CornerDialog>
      </FCThemeProvider>,
    );
    const title = getByText('Title');
    expect(title).toHaveStyleRule('color', lighten(0.3, color.info));
  });

  test('Renders when fcStyle is set to success | dark mode', () => {
    const { getByText } = render(
      <FCThemeProvider value={{ theme: 'dark' }}>
        <CornerDialog title="Title" fcStyle="success">
          I am a corner dialog
        </CornerDialog>
      </FCThemeProvider>,
    );
    const title = getByText('Title');
    expect(title).toHaveStyleRule('color', lighten(0.1, color.success));
  });
});
