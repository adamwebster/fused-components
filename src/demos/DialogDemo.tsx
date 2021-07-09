import React, { useState } from 'react';
import { Dialog } from '../components/ui/Dialog';
import { Button } from '../components/ui/Button';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import { DarkModeWrapper } from '../common/styles';
import { FCThemeProvider } from '../theming/FCTheme';

export const DialogDemo = () => {
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setDialogVisible(true)}>Show Dialog</Button>
      <Dialog
        id="dialog-99"
        aria-labeledby="DemoTitle"
        onCloseClick={() => setDialogVisible(false)}
        visible={dialogVisible}
      >
        <Dialog.Title>
          <h2 id="DemoTitle" style={{ padding: 0, margin: 0, border: 'none' }}>
            Title
          </h2>
        </Dialog.Title>
        <Dialog.Body>
          <Label htmlFor="user">Username</Label>
          <Input id="user" icon="user" />
          <Label htmlFor="Password">Password</Label>
          <Input id="Password" type="password" icon="lock-locked" />
        </Dialog.Body>
        <Dialog.Footer>
          <div style={{ textAlign: 'right' }}>
            <Button style={{ marginRight: 10 + 'px' }} onClick={() => setDialogVisible(false)}>
              Close
            </Button>
            <Button primary onClick={() => setDialogVisible(false)}>
              Ok
            </Button>
          </div>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};

export const DialogDarkDemo = () => {
  return (
    <FCThemeProvider value={{ theme: 'dark' }}>
      <DarkModeWrapper>
        <Dialog id="dialog-100" visible fixed={false} showOverlay={false} title="Dialog">
          <Dialog.Title>
            <h2 style={{ padding: 0, margin: 0, border: 'none' }}>Title</h2>
          </Dialog.Title>
          <Dialog.Body>Dialog content</Dialog.Body>
          <Dialog.Footer>Footer</Dialog.Footer>{' '}
        </Dialog>
        <br />
        <Dialog id="dialog-101" visible fcStyle="danger" fixed={false} showOverlay={false} title="Dialog">
          <Dialog.Title>
            <h2 style={{ padding: 0, margin: 0, border: 'none' }}>Title</h2>
          </Dialog.Title>
          <Dialog.Body>Dialog content</Dialog.Body>
          <Dialog.Footer>Footer</Dialog.Footer>{' '}
        </Dialog>
        <br />
        <Dialog id="dialog-102" visible fcStyle="warning" fixed={false} showOverlay={false} title="Dialog">
          <Dialog.Title>
            <h2 style={{ padding: 0, margin: 0, border: 'none' }}>Title</h2>
          </Dialog.Title>
          <Dialog.Body>Dialog content</Dialog.Body>
          <Dialog.Footer>Footer</Dialog.Footer>{' '}
        </Dialog>
        <br />
        <Dialog id="dialog-103" visible fcStyle="info" fixed={false} showOverlay={false} title="Dialog">
          <Dialog.Title>
            <h2 style={{ padding: 0, margin: 0, border: 'none' }}>Title</h2>
          </Dialog.Title>
          <Dialog.Body>Dialog content</Dialog.Body>
          <Dialog.Footer>Footer</Dialog.Footer>{' '}
        </Dialog>
        <br />
        <Dialog id="dialog-104" visible fcStyle="success" fixed={false} showOverlay={false} title="Dialog">
          <Dialog.Title>
            <h2 style={{ padding: 0, margin: 0, border: 'none' }}>Title</h2>
          </Dialog.Title>
          <Dialog.Body>Dialog content</Dialog.Body>
          <Dialog.Footer>Footer</Dialog.Footer>{' '}
        </Dialog>
      </DarkModeWrapper>
    </FCThemeProvider>
  );
};
