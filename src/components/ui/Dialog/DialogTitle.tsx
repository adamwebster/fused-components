import React, { ReactNode, useContext, ReactElement } from 'react';
import { DialogTitleStyled, CloseButton } from './style';
import { Icon } from '../../icon';
import { DialogContext } from './DialogContext';

export interface DialogTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const DialogTitle = ({ children, ...rest }: DialogTitleProps): ReactElement => {
  const { dialogState } = useContext(DialogContext);
  return (
    <DialogTitleStyled theme={dialogState.theme} fcStyle={dialogState.fcStyle} {...rest}>
      {children}
      <CloseButton
        theme={dialogState.theme}
        title="Close dialog"
        aria-label="Close"
        onClick={(): void => dialogState.onCloseClick()}
        ref={dialogState.closeButton}
      >
        <Icon icon="times" title="Close" />
      </CloseButton>
    </DialogTitleStyled>
  );
};
