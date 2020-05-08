import React, { RefObject, ReactElement, ReactNode } from 'react';
import { fcStyles } from '../../../common/types';

export interface DropdownMenuInterface {
  menuOpen?: boolean;
  menuVisible?: boolean;
  hideMenu?: (isMounted: boolean) => void;
  buttonEl?: RefObject<HTMLButtonElement | null>;
  theme?: unknown;
  fcStyle?: fcStyles;
  primary?: boolean;
  label?: string;
  buttonColor?: string;
  toggleMenu?: () => void;
  as?: string;
}

export const DropdownMenuContext = React.createContext<any | null>(null);

const reducer = (state: any, action: { payload: any; type: any }) => {
  const { payload, type } = action;
  console.log(action);
  switch (type) {
    case 'SET_MENU_OPEN':
      return {
        ...state,
        menuOpen: payload,
      };
    case 'SET_MENU_VISIBLE':
      return {
        ...state,
        menuVisible: payload,
      };
    default:
      return state;
  }
};

interface Props {
  state: any;
  children: ReactNode;
}

export const DropdownMenuProvider = ({ children, state }: Props): ReactElement => {
  const [globalState, dispatch] = React.useReducer(reducer, state);
  return (
    <DropdownMenuContext.Provider value={{ state, dispatch, globalState }}>{children}</DropdownMenuContext.Provider>
  );
};

export const DropdownMenuConsumer = DropdownMenuContext.Consumer;
