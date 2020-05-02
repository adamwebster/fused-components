import React, { ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';

import { TableCellStyled } from './style';

import { TableContextContextConsumer } from './TableContext';

export interface Props {
  children: ReactNode;
  /** The background color of the table cell */
  bgColor?: string;
  /** The foreground color(text) of the table cell */
  fgColor?: string;
  /** The width of the table cell */
  width?: string;
}
const TableCell = ({ children, width, ...rest }: Props): ReactElement => {
  return (
    <TableContextContextConsumer>
      {(tableContext): ReactNode =>
        tableContext && (
          <>
            <TableCellStyled
              width={width}
              freezeFirstColumn={tableContext.freezeFirstColumn}
              padding={tableContext.padding}
              {...rest}
            >
              {children}
            </TableCellStyled>
          </>
        )
      }
    </TableContextContextConsumer>
  );
};

TableCell.propTypes = {
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
};

export default TableCell;
