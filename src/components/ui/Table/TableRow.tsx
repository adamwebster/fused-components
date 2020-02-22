import React, { ReactNode } from 'react';
import {
  TableRowStyled,
} from "./style";

import {TableContextContextConsumer} from './TableContext';

export interface Props {
  children: ReactNode,
  /** Set the background color of the table row */
  bgColor?: string,
  /** The foreground color(text) of the table row */
  fgColor?: string,
}
const TableRow = ({ children, bgColor, fgColor, ...rest }:Props) => {
  return (
    <TableContextContextConsumer>
      {tableContext => tableContext && (
        <TableRowStyled
          zebraStripping={tableContext.zebraStripping}
          bgColor={bgColor}
          zebraStripeColor={tableContext.zebraStripeColor}
        >
          {children}
        </TableRowStyled>
      )}
    </TableContextContextConsumer>
  )
}

export default TableRow;