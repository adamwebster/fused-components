import React, { ReactNode, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { fcStyles } from '../../../common/types';
import { DialogComponent } from './dialogComponent';
import { DialogTitle } from './DialogTitle';
import { DialogFooter } from './DialogFooter';
import { DialogBody } from './DialogBody';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** The id of the element. Required for accessibility.  */
  id: string;
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
  /**
   * @ignore
   */
  children?: ReactNode;
  /**
   * @ignore
   */
  theme?: string;
  /** The id of the element that should have focus when the dialog opens */
  focusElement?: string | null | undefined;
}

export const Dialog = ({
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
  const dialogProps = {
    boxShadow,
    onCloseClick,
    fixed,
    fcStyle,
    id,
    showOverlay,
    visible,
    focusElement,
  };

  if (!fixed) {
    return (
      <DialogComponent focusElement={null} {...dialogProps} {...rest}>
        {children}
      </DialogComponent>
    );
  }
  return ReactDOM.createPortal(
    <>
      {visible && (
        <DialogComponent focusElement={focusElement} {...dialogProps} {...rest}>
          {children}
        </DialogComponent>
      )}
    </>,
    document.body,
  );
};

Dialog.Title = DialogTitle;
Dialog.Footer = DialogFooter;
Dialog.Body = DialogBody;
export default Dialog;
