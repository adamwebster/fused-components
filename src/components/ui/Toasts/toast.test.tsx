import React from 'react';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { ToastProvider, useToast } from './ToastProvider';
import { renderHook } from '@testing-library/react-hooks';

afterEach(cleanup);

describe('Toasts', () => {
  const { result } = renderHook(() => useToast());
  test('Renders the toast component', async () => {
    const { debug, getByText } = render(
      <ToastProvider>
        <button onClick={() => result.current.addDanger('test')}>Button</button>{' '}
      </ToastProvider>,
    );
    fireEvent.click(getByText('Button'));

    await waitFor(() => {
      expect(getByText('test')).toBeInTheDocument();
    });

    debug();
  });
});
