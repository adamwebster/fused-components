import React from 'react';
import {
  TableBodyStyled
} from "./style";

import TableContext from './TableContext';

const TableBody = ({ children, frozenColumnFGColor, zebraStripping, zebraStripeColor, ...rest }) => {
  return (
    <TableContext.Consumer>
      {({ frozenColumnWidth, freezeFirstColumn, tableBgColor, padding }) => (
        <TableBodyStyled bgColor={tableBgColor}  padding={padding} freezeFirstColumn={freezeFirstColumn} frozenColumnWidth={frozenColumnWidth}>
          {children}
        </TableBodyStyled>
      )}
    </TableContext.Consumer>
  )
}

export default TableBody;