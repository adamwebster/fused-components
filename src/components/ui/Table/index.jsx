import React from "react";
import {
  StyledTable,
} from "./style";

import PropTypes from "prop-types";
import TableContext from './TableContext';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableBody from './TableBody';
import TableCell from './TableCell';

export const Table = ({
  padding,
  zebraStripping,
  zebraStripeColor,
  bgColor,
  fgColor,
  freezeFirstColumn,
  children,
  frozenColumnWidth,
  frozenColumnBGColor,
  frozenColumnFGColor,
}) => {
  const state = {
    padding,
    frozenColumnBGColor,
    frozenColumnFGColor,
    freezeFirstColumn,
    zebraStripping,
    zebraStripeColor,
    frozenColumnWidth,
    tableBgColor: bgColor
  }
  return (
    <>
      <StyledTable
        fgColor={fgColor && fgColor}
        bgColor={bgColor && bgColor}
      >
        <TableContext.Provider value={state}>
          {children}
        </TableContext.Provider>
      </StyledTable>
    </>
  );
};

Table.Header = TableHeader;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Body = TableBody;

Table.propTypes = {
  /** Sets the padding for the cells */
  padding: PropTypes.string,
  /** Sets the table header background color */
  zebraStripping: PropTypes.bool,
  /** Sets the zebra stripe color */
  zebraStripeColor: PropTypes.string,
  /** Sets the table background color */
  bgColor: PropTypes.string,
  /** Sets the table text color */
  fgColor: PropTypes.string,
  /** If set to true will freeze the first column */
  freezeFirstColumn: PropTypes.bool,
  /** Sets the width of the frozen column used to set the margin left of the following columns */
  frozenColumnWidth: PropTypes.string,
  frozenColumnBGColor: PropTypes.string,
  frozenColumnFGColor: PropTypes.string,
};

Table.defaultProps = {
  padding: "5px",
  zebraStripping: false,
  zebraStripeColor: "#ebebeb",
  freezeFirstColumn: false,
};
