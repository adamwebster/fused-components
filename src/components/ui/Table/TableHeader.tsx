import React, { ReactNode } from 'react';

import {
  TableHeaderStyled
} from "./style";

import {TableContextContextConsumer} from './TableContext';

export interface Props {
  fgColor?: string,
  padding?: string,
  showBottomBorder?: boolean,
  bgColor?: string,
  children?: ReactNode,
}
const TableHeader = ({ fgColor, padding, showBottomBorder = true, bgColor, children, ...rest }:Props) => {
  return (
    <TableContextContextConsumer>
      {tableContext => tableContext && (
       <>{console.log(tableContext)}
          <TableHeaderStyled
            showBottomBorder={showBottomBorder}
            bgColor={bgColor}
            fgColor={fgColor}
            padding={tableContext.padding}
            freezeFirstColumn={tableContext.freezeFirstColumn}
            frozenColumnWidth={tableContext.frozenColumnWidth}
            {...rest}>
            {children}
          </TableHeaderStyled>
      </>
      )}
    </TableContextContextConsumer>
  )
}

export default TableHeader;