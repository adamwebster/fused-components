import React from 'react';

export interface TableInterface {
  frozenColumnWidth: string,
  freezeFirstColumn: boolean,
  padding: string,
  tableBgColor: string,
  frozenColumnBGColor: string,
  frozenColumnFGColor: string,
  zebraStrippingColor: string,
  zebraStripeColor: string,
  zebraStripping: boolean,
}

export const TableContext = React.createContext<TableInterface | null>(null);

export const TableContextProvider = TableContext.Provider;
  
export const TableContextContextConsumer = TableContext.Consumer;
