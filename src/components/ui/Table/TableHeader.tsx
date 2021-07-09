import React, { ReactNode, ReactElement } from 'react';

import { TableHeaderStyled } from './style';

import { TableContextContextConsumer } from './TableContext';

export interface Props extends React.HTMLAttributes<HTMLElement> {
  /** If the bottom border should be shown */
  showBottomBorder?: boolean;
  children?: ReactNode;
}
export const TableHeader = ({ showBottomBorder = true, children, ...rest }: Props): ReactElement => {
  return (
    <TableContextContextConsumer>
      {(tableContext): ReactNode =>
        tableContext && (
          <>
            <TableHeaderStyled
              theme={tableContext.theme}
              showBottomBorder={showBottomBorder}
              padding={tableContext.padding}
              freezeFirstColumn={tableContext.freezeFirstColumn}
              frozenColumnWidth={tableContext.frozenColumnWidth}
              {...rest}
            >
              {children}
            </TableHeaderStyled>
          </>
        )
      }
    </TableContextContextConsumer>
  );
};

export default TableHeader;
