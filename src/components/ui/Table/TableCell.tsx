import React, { ReactNode, ReactElement, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';

import { TableCellStyled } from './style';

import { TableContextContextConsumer } from './TableContext';

export interface Props extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}
export const TableCell = ({ children, ...rest }: Props): ReactElement => {
  return (
    <TableContextContextConsumer>
      {(tableContext): ReactNode =>
        tableContext && (
          <>
            <TableCellStyled
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
