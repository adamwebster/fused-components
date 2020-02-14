import React from 'react';
import {
  TableRowStyled,
} from "./style";

import TableContext from './TableContext';

const TableRow = ({ children, padding, bgColor, fgColor, frozenColumnBGColor, frozenColumnFGColor, ...rest }) => {
  return (
    <TableContext.Consumer>
      {({ zebraStripping, zebraStripeColor, freezeFirstColumn }) => (
        <TableRowStyled
          freezeFirstColumn={freezeFirstColumn}
          zebraStripping={zebraStripping}
          bgColor={bgColor}
          fgColor={fgColor}
          zebraStripeColor={zebraStripeColor}
        >
          {children}
        </TableRowStyled>
      )}
    </TableContext.Consumer>
  )
}

export default TableRow;