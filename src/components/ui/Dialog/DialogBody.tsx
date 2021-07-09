import React, { ReactNode, useContext, ReactElement } from 'react';
import { DialogContent } from './style';
import { DialogContext } from './DialogContext';

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const DialogBody = ({ children, ...rest }: DialogBodyProps): ReactElement => {
  const { dialogState } = useContext(DialogContext);
  return (
    <DialogContent theme={dialogState.theme} {...rest}>
      {children}
    </DialogContent>
  );
};
