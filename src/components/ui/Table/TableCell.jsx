import React from 'react';
import PropTypes from "prop-types";

import {
  TableCellStyled,
} from "./style";

import TableContext from './TableContext';

const TableCell = ({ children, bgColor, fgColor, width, ...rest }) => {
  return (
    <TableContext.Consumer>
      {({ frozenColumnBGColor, frozenColumnFGColor, freezeFirstColumn, padding }) => (
        <>
          <TableCellStyled fgColor={fgColor} bgColor={bgColor} width={width} freezeFirstColumn={freezeFirstColumn} frozenColumnBGColor={frozenColumnBGColor} frozenColumnFGColor={frozenColumnFGColor} padding={padding}>{children}</TableCellStyled>
        </>
      )}
    </TableContext.Consumer>
  )
}

TableCell.propTypes = {
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
}

export default TableCell;