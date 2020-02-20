import React, { ReactNode } from 'react';
import {
  TableRowStyled,
} from "./style";

import {TableContextContextConsumer} from './TableContext';

export interface Props {
  children: ReactNode,
  padding?: string,
  bgColor?: string,
  fgColor?: string,
  frozenColumnBGColor?: string,
  frozenColumnFGColor?: string,
}
const TableRow = ({ children, padding, bgColor, fgColor, frozenColumnBGColor, frozenColumnFGColor, ...rest }:Props) => {
  return (
    <TableContextContextConsumer>
      {tableContext => tableContext && (
        <TableRowStyled
          freezeFirstColumn={tableContext.freezeFirstColumn}
          zebraStripping={tableContext.zebraStripping}
          bgColor={bgColor}
          fgColor={fgColor}
          zebraStripeColor={tableContext.zebraStripeColor}
        >
          {children}
        </TableRowStyled>
      )}
    </TableContextContextConsumer>
  )
}

export default TableRow;