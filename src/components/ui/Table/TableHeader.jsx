import React from 'react';
import PropTypes from "prop-types";

import {
  TableHeaderStyled
} from "./style";

import TableContext from './TableContext';

const TableHeader = ({ fgColor, padding, showBottomBorder, bgColor, children, ...rest }) => {
  return (
    <TableContext.Consumer>
      {({ freezeFirstColumn, frozenColumnWidth, padding}) => (
          <TableHeaderStyled
            showBottomBorder={showBottomBorder}
            bgColor={bgColor}
            fgColor={fgColor}
            padding={padding}
            freezeFirstColumn={freezeFirstColumn}
            frozenColumnWidth={frozenColumnWidth}
            {...rest}>
            {children}
          </TableHeaderStyled>
      )}
    </TableContext.Consumer>
  )
}

TableHeader.defaultProps = {
  showBottomBorder: true,
}

TableHeader.propTypes = {
  /** If set to true it will sown the bottom border */
  showBottomBorder: PropTypes.bool,
  /** Sets the background color of the header */
  bgColor: PropTypes.string,
  /** Sets the text color for the header */
  fgColor: PropTypes.string,
}

export default TableHeader;