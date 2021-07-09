import React, { RefObject, ReactElement, ReactNode } from 'react';
import { fcStyles } from '../../../common/types';

export interface DialogInterface {
  theme?: unknown;
  onCloseClick?: () => {};
  closeButton: RefObject<any>;
  fcStyle: fcStyles;
}

export const DialogContext = React.createContext<any | null>(null);

const reducer = (state: any, action: { payload?: any; type: any }) => {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
};

interface Props {
  state: any;
  children: ReactNode;
}

export const DialogProvider = ({ children, state }: Props): ReactElement => {
  const [dialogState, dispatch] = React.useReducer(reducer, state);
  return <DialogContext.Provider value={{ dialogState, dispatch }}>{children}</DialogContext.Provider>;
};

export const DropdownMenuConsumer = DialogContext.Consumer;
