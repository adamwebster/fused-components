import React, { ReactNode, ReactElement } from 'react';

import { TableHeaderStyled } from './style';

import { TableContextContextConsumer } from './TableContext';

export interface Props {
  /** The foreground color(text) pf the table cell */
  fgColor?: string;
  /** If the bottom border should be shown */
  showBottomBorder?: boolean;
  /** What the background color of the table header should be */
  bgColor?: string;
  children?: ReactNode;
}
const TableHeader = ({ showBottomBorder = true, children, ...rest }: Props): ReactElement => {
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
