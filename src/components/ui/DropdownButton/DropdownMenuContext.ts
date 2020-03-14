import React, { RefObject } from 'react';

export interface DropdownMenuInterface {
  menuOpen: boolean;
  hideMenu: () => void;
  buttonEl: RefObject<HTMLButtonElement>;
  theme?: unknown;
}

export const DropdownMenuContext = React.createContext<DropdownMenuInterface | null>(null);

export const DropdownMenuProvider = DropdownMenuContext.Provider;

export const DropdownMenuConsumer = DropdownMenuContext.Consumer;
