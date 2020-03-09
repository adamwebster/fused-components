import React from 'react';

export interface TableInterface {
  padding?: string,
  frozenColumnBGColor?: string,
  frozenColumnFGColor?: string,
  freezeFirstColumn?: boolean,
  zebraStripping?: boolean,
  zebraStripeColor?: string,
  frozenColumnWidth?: string,
  tableBgColor?: string,
  theme?: any
}

export const TableContext = React.createContext<TableInterface | null>(null);

export const TableContextProvider = TableContext.Provider;
  
export const TableContextContextConsumer = TableContext.Consumer;
