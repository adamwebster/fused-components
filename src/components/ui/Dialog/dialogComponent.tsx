import React, { ReactNode, ReactElement, useEffect, useRef } from 'react';
import { Button } from '../Button';
import { StyledDialog, DialogTitle, DialogContent, CloseButton, DialogFooter, Overlay } from './style';
import { color } from '../../../styles/styles';
import { Icon } from '../../icon';
import { FCThemeConsumer } from '../../../theming/FCTheme';
import { fcStyles } from '../../../common/types';

export interface Props {
  /** Sets if the dialog has a box shadow */
  boxShadow?: boolean;
  /** Sets the tile of the dialog */
  title?: string;
  /** Sets if the dialog should be visible */
  visible: boolean;
  /** Set the text for the confirm button */
  confirmText?: string;
  /** Sets what should happen when the close button is clicked */
  onCloseClick?: () => void;
  /** Sets if the dialog should have a fixed position */
  fixed?: boolean;
  /** Set the style for the Dialog */
  fcStyle?: fcStyles;
  /** Set to show or not show the overlay */
  showOverlay?: boolean;
  /** Set the text for the cancel button */
  cancelText?: string;
  children?: ReactNode;
  theme?: string;
  id: string;
  focusElement: string | null | undefined;
}

export const DialogComponent = ({
  boxShadow = true,
  title,
  visible,
  id,
  confirmText = 'Yes',
  children,
  onCloseClick = (): void => undefined,
  fixed = true,
  fcStyle,
  showOverlay = true,
  cancelText = 'Cancel',
  focusElement,
}: Props): ReactElement => {
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const cancelButton = useRef<HTMLButtonElement | null>(null);
  const confirmButton = useRef<HTMLButtonElement | null>(null);
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
    console.log(e.key);
    if (e.key === 'Tab') {
      if (cancelButton) {
        if (document.activeElement === confirmButton.current) {
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
  return (
    <>
      {showOverlay && <Overlay data-testid="dialog-overlay" onClick={(): void => onCloseClick()} />}
      <FCThemeConsumer>
        {(themeContext): ReactNode => (
          <StyledDialog
            ref={dialogRef}
            onKeyDown={(e: { key: string }): void => handleDialogKeyDown(e)}
            id={id}
            fcStyle={fcStyle}
            theme={themeContext.theme}
            visible={visible}
            fixed={fixed}
            boxShadow={boxShadow}
            role="dialog"
            aria-labelledby={`${id}_title`}
          >
            <DialogTitle theme={themeContext.theme} fcStyle={fcStyle}>
              <h2 id={`${id}_title`}>{title}</h2>
              <CloseButton
                theme={themeContext.theme}
                title="Close dialog"
                aria-label="Close"
                onClick={(): void => onCloseClick()}
                ref={closeButton}
              >
                <Icon icon="times" title="Close" />
              </CloseButton>
            </DialogTitle>
            <DialogContent theme={themeContext.theme}>{children}</DialogContent>
            <DialogFooter fcStyle={fcStyle} theme={themeContext.theme}>
              <Button
                id={`${id}_close_button`}
                buttonColor={themeContext.theme === 'dark' ? color.darkModeMedium : color.dark}
                onClick={(): void => onCloseClick()}
                ref={cancelButton}
              >
                {cancelText}
              </Button>

              <Button ref={confirmButton} id={`${id}_confirm_button`} primary fcStyle={fcStyle}>
                {confirmText}
              </Button>
            </DialogFooter>
          </StyledDialog>
        )}
      </FCThemeConsumer>
    </>
  );
};
