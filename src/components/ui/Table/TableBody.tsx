import React, { ReactNode } from 'react';
import {
  TableBodyStyled
} from "./style";

import { TableContextContextConsumer } from './TableContext';

export interface Props {
  children: ReactNode,
}
const TableBody = ({ children, ...rest }:Props) => {
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