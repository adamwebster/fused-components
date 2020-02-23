
import * as React from 'react';

export interface DropdownMenuInterface {
    menuOpen: boolean,
    hideMenu: () => void,
    buttonEl: any,
}

export const DropdownMenuContext = React.createContext<DropdownMenuInterface | null>(null);


export const DropdownMenuProvider = DropdownMenuContext.Provider;
  
export const DropdownMenuConsumer = DropdownMenuContext.Consumer;