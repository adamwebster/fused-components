import React, { ReactNode } from 'react';
import PropTypes from "prop-types";

import {
  TableCellStyled,
} from "./style";

import {TableContextContextConsumer} from './TableContext';

export interface Props {
  children: ReactNode,
  /** The background color of the table cell */
  bgColor?: string,
  /** The foreground color(text) of the table cell */
  fgColor?: string,
  /** The width of the table cell */
  width?: string,
}
const TableCell = ({ children, bgColor, fgColor, width, ...rest }:Props) => {
  return (
    <TableContextContextConsumer>
      {tableContext => tableContext && (
        <>
          <TableCellStyled fgColor={fgColor} bgColor={bgColor} width={width} freezeFirstColumn={tableContext.freezeFirstColumn} frozenColumnBGColor={tableContext.frozenColumnBGColor} frozenColumnFGColor={tableContext.frozenColumnFGColor} padding={tableContext.padding}>{children}</TableCellStyled>
        </>
      )}
    </TableContextContextConsumer>
  )
}

TableCell.propTypes = {
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
}

export default TableCell;