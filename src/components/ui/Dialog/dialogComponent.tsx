import React, { ReactNode, ReactElement, useEffect, useRef, useContext } from 'react';
import { StyledDialog, Overlay } from './style';
import { FCTheme } from '../../../theming/FCTheme';
import { fcStyles } from '../../../common/types';
import { DialogProvider } from './DialogContext';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Sets if the dialog has a box shadow */
  boxShadow?: boolean;
  /** Sets if the dialog should be visible */
  visible: boolean;
  /** Sets what should happen when the close button is clicked */
  onCloseClick?: () => void;
  /** Sets if the dialog should have a fixed position */
  fixed?: boolean;
  /** Set the style for the Dialog */
  fcStyle?: fcStyles;
  /** Set to show or not show the overlay */
  showOverlay?: boolean;
  children?: ReactNode;
  theme?: string;
  id: string;
  focusElement: string | null | undefined;
}

export const DialogComponent = ({
  boxShadow = true,
  visible,
  id,
  children,
  onCloseClick = (): void => undefined,
  fixed = true,
  fcStyle,
  showOverlay = true,
  focusElement,
  ...rest
}: Props): ReactElement => {
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (fixed)
      if (focusElement) {
        document.getElementById(focusElement)?.focus();
      } else {
        closeButton.current?.focus();
      }
  }, []);
  const handleDialogKeyDown = (e: any): void => {
    if (e.key === 'Tab') {
      let toSearch: any = document;
      if (dialogRef) {
        toSearch = dialogRef.current;
      }

      const focusable = toSearch.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const lastFocusable = focusable[focusable.length - 1];
      if (lastFocusable) {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          closeButton.current?.focus();
        }
      }
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      onCloseClick();
    }
  };
  const theme = useContext(FCTheme);
  const state = {
    theme: theme.theme,
    onCloseClick,
    closeButton,
    fcStyle,
  };
  return (
    <>
      {showOverlay && <Overlay data-testid="dialog-overlay" onClick={(): void => onCloseClick()} />}
      <DialogProvider state={state}>
        {' '}
        <StyledDialog
          ref={dialogRef}
          onKeyDown={(e: { key: string }): void => handleDialogKeyDown(e)}
          id={id}
          fcStyle={fcStyle}
          theme={theme.theme}
          visible={visible}
          fixed={fixed}
          boxShadow={boxShadow}
          role="dialog"
          {...rest}
        >
          {children}
        </StyledDialog>
      </DialogProvider>
    </>
  );
};
