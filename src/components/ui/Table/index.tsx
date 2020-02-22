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
  /** Set the padding for the table */
  padding?: string,
  /** Set if the table has zebra stripping */
  zebraStripping?: boolean,
  /** Set the zebra stripe color */
  zebraStripeColor?: string,
  /** Set the background color of the table */
  bgColor?: string,
  /** Set the foreground color(text) of the table */
  fgColor?: string,
  /** If the first column should be frozen */
  freezeFirstColumn?: boolean,
  /** The width of the first column */
  frozenColumnWidth?: string,
  /** Frozen column background color */
  frozenColumnBGColor?: string,
  /** Frozen column foreground(text) color */
  frozenColumnFGColor?: string,
  children: ReactNode,
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
