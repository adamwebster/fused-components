import React, { ReactNode, ReactElement } from 'react';
import { TableRowStyled } from './style';

import { TableContextContextConsumer } from './TableContext';

export interface Props {
  children: ReactNode;
  /** Set the background color of the table row */
  bgColor?: string;
}
const TableRow = ({ children, bgColor, ...rest }: Props): ReactElement => {
  return (
    <TableContextContextConsumer>
      {(tableContext): ReactNode =>
        tableContext && (
          <TableRowStyled
            theme={tableContext.theme}
            zebraStriping={tableContext.zebraStriping}
            zebraStripeColor={tableContext.zebraStripeColor}
            {...rest}
          >
            {children}
          </TableRowStyled>
        )
      }
    </TableContextContextConsumer>
  );
};

export default TableRow;
