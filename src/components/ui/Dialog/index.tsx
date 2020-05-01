import React, { ReactNode, ReactElement } from 'react';
import { Button } from '../Button';
import { StyledDialog, DialogTitle, DialogContent, CloseButton, DialogFooter, Overlay } from './style';
import { color } from '../../../styles/styles';
import { Icon } from '../../icon';
import { fcStyles } from '../../../common/types';
import { FCThemeConsumer } from '../../../theming/FCTheme';

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
}
export const Dialog = ({
  boxShadow = true,
  title,
  visible,
  confirmText = 'Yes',
  children,
  onCloseClick = (): void => undefined,
  fixed = true,
  fcStyle,
  showOverlay = true,
  cancelText = 'Cancel',
}: Props): ReactElement => {
  return (
    <>
      {visible && (
        <>
          {showOverlay && <Overlay data-testid="modal-overlay" onClick={(): void => onCloseClick()} />}
          <FCThemeConsumer>
            {(themeContext): ReactNode => (
              <StyledDialog
                fcStyle={fcStyle}
                theme={themeContext.theme}
                visible={visible}
                fixed={fixed}
                boxShadow={boxShadow}
                role="dialog"
              >
                <DialogTitle theme={themeContext.theme} fcStyle={fcStyle}>
                  <h2>{title}</h2>
                  <CloseButton
                    theme={themeContext.theme}
                    title="Close dialog"
                    aria-label="Close"
                    onClick={(): void => onCloseClick()}
                  >
                    <Icon icon="times" />
                  </CloseButton>
                </DialogTitle>
                <DialogContent theme={themeContext.theme}>{children}</DialogContent>
                <DialogFooter fcStyle={fcStyle} theme={themeContext.theme}>
                  <Button
                    buttonColor={themeContext.theme === 'dark' ? color.darkModeMedium : color.mediumdark}
                    onClick={(): void => onCloseClick()}
                  >
                    {cancelText}
                  </Button>

                  <Button primary fcStyle={fcStyle}>
                    {confirmText}
                  </Button>
                </DialogFooter>
              </StyledDialog>
            )}
          </FCThemeConsumer>
        </>
      )}
    </>
  );
};
