import React, { ReactNode } from "react";
import { TableRowStyled } from "./style";

import { TableContextContextConsumer } from "./TableContext";

export interface Props {
  children: ReactNode;
  /** Set the background color of the table row */
  bgColor?: string;
}
const TableRow = ({ children, bgColor }: Props) => {
  return (
    <TableContextContextConsumer>
      {tableContext =>
        tableContext && (
          <TableRowStyled
            theme={tableContext?.theme}
            zebraStripping={tableContext.zebraStripping}
            bgColor={bgColor}
            zebraStripeColor={tableContext.zebraStripeColor}
          >
            {children}
          </TableRowStyled>
        )
      }
    </TableContextContextConsumer>
  );
};

export default TableRow;
