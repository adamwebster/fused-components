import React, { ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';

import { TableCellStyled } from './style';

import { TableContextContextConsumer } from './TableContext';

export interface Props {
  children: ReactNode;
}
const TableCell = ({ children, ...rest }: Props): ReactElement => {
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
