import React from 'react';
import { render, cleanup, waitFor, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import 'jest-styled-components';
import { ToastDemo } from '../../../demos/ToastDemo';
import { act } from 'react-dom/test-utils';
afterEach(cleanup);

describe('Toasts', () => {
  test('Renders the toast component on initial load', async () => {
    const { getByText } = render(<ToastDemo />);
    await waitFor(() => {
      expect(getByText('First automatic toast')).toBeInTheDocument();
    });
  });

  test('Adds info toast on click', async () => {
    const { getByText } = render(<ToastDemo />);
    const button = getByText('Info Toast');
    fireEvent.click(button);
    await waitFor(() => {
      expect(getByText('Did you know?')).toBeInTheDocument();
    });
  });

  test('Adds success toast on click', async () => {
    const { getByText } = render(<ToastDemo />);
    const button = getByText('Success Toast (Duration set to 10sec)');
    fireEvent.click(button);
    await waitFor(() => {
      expect(getByText('Something went right for once...')).toBeInTheDocument();
    });
  });

  test('Adds warning toast on click and removes it and only adds one', async () => {
    const { getByText, queryByText } = render(<ToastDemo />);
    const button = getByText('Warning Toast (Maximum 1)');
    fireEvent.click(button);
    fireEvent.click(button);
    await waitFor(
      () => {
        expect(getByText('Winter is coming.')).toBeInTheDocument();
      },
      { timeout: 4000 },
    );
    waitForElementToBeRemoved(() => queryByText('Winter is coming.'), { timeout: 5000 });
  });

  test('Adds danger toast on click', async () => {
    const { getByText } = render(<ToastDemo />);
    const button = getByText('Danger Toast');
    fireEvent.click(button);
    await waitFor(() => {
      expect(getByText('Ok fly boy')).toBeInTheDocument();
    });
  });

  test('Mouse over causes toast to stay on screen', async () => {
    jest.useFakeTimers();
    const { getByRole, getByText, queryByText } = render(<ToastDemo />);
    const button = getByText('Danger Toast');
    fireEvent.click(button);
    await waitFor(() => {
      expect(queryByText('Ok fly boy')).toBeInTheDocument();
    });
    const alert = getByRole('alert');
    fireEvent.mouseOver(alert);
    act(() => {
      jest.advanceTimersByTime(4500);
    });
    expect(queryByText('Ok fly boy')).toBeInTheDocument();
  });

  test('Mouseout fires causes toast to disappear', async () => {
    jest.useFakeTimers();
    const { getByRole, getByText, queryByText } = render(<ToastDemo />);
    const button = getByText('Danger Toast');
    fireEvent.click(button);
    await waitFor(() => {
      expect(queryByText('Ok fly boy')).toBeInTheDocument();
    });
    const alert = getByRole('alert');
    fireEvent.mouseOut(alert);
    act(() => {
      jest.advanceTimersByTime(4500);
    });
    expect(queryByText('Ok fly boy')).not.toBeInTheDocument();
  });

  test('Clicking the close button causes the alert to disappear', async () => {
    jest.useFakeTimers();
    const { getByTitle, getByText, queryByText } = render(<ToastDemo />);
    const button = getByText('Danger Toast');
    fireEvent.click(button);
    await waitFor(() => {
      expect(queryByText('Ok fly boy')).toBeInTheDocument();
    });
    const closeButton = getByTitle('Close Alert');
    fireEvent.click(closeButton);
    act(() => {
      jest.advanceTimersByTime(600);
      expect(queryByText('Ok fly boy')).not.toBeInTheDocument();
    });
  });
});
