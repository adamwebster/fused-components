import React from 'react';

export interface TableInterface {
  padding?: string;
  freezeFirstColumn?: boolean;
  zebraStriping?: boolean;
  zebraStripeColor?: string;
  frozenColumnWidth?: string;
  theme?: unknown;
  highlightOnHover?: boolean;
}

export const TableContext = React.createContext<TableInterface | null>(null);

export const TableContextProvider = TableContext.Provider;

export const TableContextContextConsumer = TableContext.Consumer;
