import React, { ReactNode } from "react";
import {
  StyledTable,
} from "./style";

import {TableContextProvider} from './TableContext';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableBody from './TableBody';
import TableCell from './TableCell';

export interface Props {
  padding?: string,
  zebraStripping?: boolean,
  zebraStripeColor?: string,
  bgColor?: string,
  fgColor?: string,
  freezeFirstColumn?: boolean,
  frozenColumnWidth?: string,
  frozenColumnBGColor?: string,
  frozenColumnFGColor?: string,
  children: ReactNode,
  tableBgColor?: string,
}
export const Table = ({
  padding = '5px',
  zebraStripping = false,
  zebraStripeColor = '#ebebeb',
  bgColor,
  fgColor,
  freezeFirstColumn = false,
  children,
  frozenColumnWidth,
  frozenColumnBGColor,
  frozenColumnFGColor,
}:Props) => {
  const state = {
    padding,
    frozenColumnBGColor,
    frozenColumnFGColor,
    freezeFirstColumn,
    zebraStripping,
    zebraStripeColor,
    frozenColumnWidth,
    tableBgColor: bgColor
  }
  return (
    <>
      <StyledTable
        fgColor={fgColor && fgColor}
        bgColor={bgColor && bgColor}
      >
        <TableContextProvider value={state}>
          {children}
        </TableContextProvider>
      </StyledTable>
    </>
  );
};

Table.Header = TableHeader;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Body = TableBody;
