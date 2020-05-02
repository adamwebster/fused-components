import React, { ReactNode, ReactElement } from 'react';
import { TableBodyStyled } from './style';

import { TableContextContextConsumer } from './TableContext';

export interface Props {
  children: ReactNode;
}
const TableBody = ({ children, ...rest }: Props): ReactElement => {
  return (
    <TableContextContextConsumer>
      {(tableContext): ReactNode =>
        tableContext && (
          <TableBodyStyled
            theme={tableContext.theme}
            highlightOnHover={tableContext.highlightOnHover}
            padding={tableContext.padding}
            freezeFirstColumn={tableContext.freezeFirstColumn}
            frozenColumnWidth={tableContext.frozenColumnWidth}
            {...rest}
          >
            {children}
          </TableBodyStyled>
        )
      }
    </TableContextContextConsumer>
  );
};

export default TableBody;
