import React, { ReactNode, ReactElement } from 'react';
import CornerDialogPopover from './dialog';
import { fcStyles } from '../../../common/types';
import ReactDOM from 'react-dom';

export interface Props {
  /** The id of the element. Required for accessibility.  */
  id: string;
  /**
   * @ignore
   */
  fixed?: boolean;
  /** What should happen if the close (times icon) or the cancel button is clicked. */
  onCloseClick?: () => void;
  /** What should happen if the confirm button button is clicked. */
  onConfirmClick?: () => void;
  /** If the corner dialog is visible  */
  visible?: boolean;
  /** The text for the cancel button */
  cancelText?: string;
  /** The text for the confirm button */
  confirmText?: string;
  /** The title for the dialog */
  title?: string;
  /** The predefined styles for the corner dialog.  "danger" | "warning" | "info" | "success" */
  fcStyle?: fcStyles;
  /** The icon that will show beside the content for the dialog */
  icon?: string;
  /**
   * @ignore
   */
  children: ReactNode;
}
export const CornerDialog = ({
  fixed = true,
  onCloseClick = (): void => undefined,
  onConfirmClick = (): void => undefined,
  visible = true,
  cancelText = 'Cancel',
  confirmText = 'Learn More',
  title,
  children,
  fcStyle,
  icon,
  id,
}: Props): ReactElement => {
  const element = document.body;

  if (!fixed) {
    return (
      <CornerDialogPopover
        fcStyle={fcStyle}
        fixed={fixed}
        onCloseClick={onCloseClick}
        onConfirmClick={onConfirmClick}
        visible={visible}
        cancelText={cancelText}
        confirmText={confirmText}
        title={title}
        icon={icon}
        id={id}
      >
        {children}
      </CornerDialogPopover>
    );
  }
  return ReactDOM.createPortal(
    <CornerDialogPopover
      fcStyle={fcStyle}
      fixed={fixed}
      onCloseClick={onCloseClick}
      onConfirmClick={onConfirmClick}
      visible={visible}
      cancelText={cancelText}
      confirmText={confirmText}
      title={title}
      icon={icon}
      id={id}
    >
      {children}
    </CornerDialogPopover>,
    element,
  );
};
