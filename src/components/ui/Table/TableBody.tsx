import React, { ReactNode } from 'react';
import {
  TableBodyStyled
} from "./style";

import { TableContextContextConsumer } from './TableContext';

export interface Props {
  children: ReactNode,
  frozenColumnFGColor?: string,
  zebraStripping?: boolean,
  zebraStripeColor?: string,
}
const TableBody = ({ children, frozenColumnFGColor, zebraStripping, zebraStripeColor, ...rest }:Props) => {
  return (
    <TableContextContextConsumer>
      {tableContext => tableContext && (
        <TableBodyStyled bgColor={tableContext.tableBgColor}  padding={tableContext.padding} freezeFirstColumn={tableContext.freezeFirstColumn} frozenColumnWidth={tableContext.frozenColumnWidth}>
          {children}
        </TableBodyStyled>
      )}
    </TableContextContextConsumer>
  )
}

export default TableBody;