import React, { ReactNode, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { fcStyles } from '../../../common/types';
import { DialogComponent } from './dialogComponent';

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
  focusElement?: string | null | undefined;
}
export const Dialog = ({
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
  const dialogProps = {
    boxShadow,
    title,
    confirmText,
    onCloseClick,
    fixed,
    fcStyle,
    id,
    showOverlay,
    cancelText,
    visible,
    focusElement,
  };
  if (!fixed) {
    return (
      <DialogComponent focusElement={null} {...dialogProps}>
        {children}
      </DialogComponent>
    );
  }
  return ReactDOM.createPortal(
    <>
      {visible && (
        <DialogComponent focusElement={focusElement} {...dialogProps}>
          {children}
        </DialogComponent>
      )}
    </>,
    document.body,
  );
};
