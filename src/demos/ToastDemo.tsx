import React, { useState, useEffect } from 'react';
import { useToast, ToastProvider } from '../components/ui/Toasts/ToastProvider';
import { Button } from '../components/ui/Button';
import { FCThemeProvider } from '../theming/FCTheme';

const ToastLoad = () => {
  const toasts = useToast();

  useEffect(() => {
    setTimeout(() => {
      toasts?.addInfo('First automatic toast');
    }, 1000);

    setTimeout(() => {
      toasts?.addInfo('test2', `Message with <strong>HTML in it</strong>`);
    }, 3000);
  }, []);

  return null;
};

const Toaster = () => {
  const toasts = useToast();

  return (
    <>
      <ToastLoad />
      <Button
        title="Add info toast"
        onClick={() => {
          toasts?.addInfo('Did you know?', 'That space smells like seared steak.');
        }}
      >
        Info Toast
      </Button>
      <br /> <br />
      <Button
        onClick={() => {
          toasts?.addSuccess(
            'This is a really really long title that should wrap down to the next line and not around the icon. Hooray!',
            'Something went right for once...',
            {
              duration: 10,
            },
          );
        }}
      >
        Success Toast (Duration set to 10sec)
      </Button>
      <br /> <br />
      <Button
        onClick={() => {
          toasts?.addWarning('Warning', 'Winter is coming.', { id: 'one' });
        }}
      >
        Warning Toast (Maximum 1)
      </Button>
      <br /> <br />
      <Button
        onClick={() => {
          toasts?.addDanger('Ok fly boy', 'Highway to the danger zone');
        }}
      >
        Danger Toast
      </Button>
      <br /> <br />
      <Button
        onClick={() => {
          toasts?.addDanger('Danger Will Robinson');
        }}
      >
        Danger Toast No Content
      </Button>
    </>
  );
};
export const ToastDemo = () => {
  const [position, setPosition] = useState('top');
  const [theme, setTheme] = useState('light');

  return (
    <FCThemeProvider value={{ theme }}>
      <ToastProvider position={(position as unknown) as undefined}>
        <label>Position</label>
        <select onChange={e => setPosition(e.target.value)}>
          <option value="top">top</option>
          <option value="bottom">bottom</option>
          <option value="bottom-left">top-right</option>
          <option value="bottom-right">bottom-right</option>
        </select>
        <label>theme</label>
        <select onChange={e => setTheme(e.target.value)}>
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
        <br />
        <br />
        <Toaster />
      </ToastProvider>
    </FCThemeProvider>
  );
};
