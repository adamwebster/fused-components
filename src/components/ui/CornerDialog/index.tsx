import React, { ReactNode, ReactElement } from 'react';
import CornerDialogPopover from './dialog';
import { fcStyles } from '../../../common/types';
import ReactDOM from 'react-dom';

export interface Props {
  fixed?: boolean;
  onCloseClick?: () => void;
  visible?: boolean;
  cancelText?: string;
  confirmText?: string;
  title?: string;
  fcStyle?: fcStyles;
  icon?: string;
  children: ReactNode;
  onConfirmClick?: () => void;
  id: string;
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
