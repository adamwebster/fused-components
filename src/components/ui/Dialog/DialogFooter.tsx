import React, { ReactNode, useContext, ReactElement } from 'react';
import { DialogFooterStyled } from './style';
import { DialogContext } from './DialogContext';

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const DialogFooter = ({ children, ...rest }: DialogFooterProps): ReactElement => {
  const { dialogState } = useContext(DialogContext);
  return (
    <DialogFooterStyled fcStyle={dialogState.fcStyle} theme={dialogState.theme} {...rest}>
      {children}
    </DialogFooterStyled>
  );
};
