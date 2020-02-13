import React from "react";
import {
  StyledTable,
  TableHeaderStyled,
  TableCellStyled,
  TableBodyStyled,
  TableRowStyled,
} from "./style";
import PropTypes from "prop-types";

const TableContext = React.createContext({})

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

export const TableHeader = ({ fgColor, padding, showBottomBorder, bgColor, children, ...rest }) => {
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

export const TableRow = ({ children, padding, bgColor, fgColor, frozenColumnBGColor, frozenColumnFGColor, ...rest }) => {
  return (
    <TableContext.Consumer>
      {({ zebraStripping, zebraStripeColor, freezeFirstColumn }) => (
        <TableRowStyled
          freezeFirstColumn={freezeFirstColumn}
          zebraStripping={zebraStripping}
          bgColor={bgColor}
          fgColor={fgColor}
          zebraStripeColor={zebraStripeColor}
        >
          {children}
        </TableRowStyled>
      )}
    </TableContext.Consumer>
  )
}

export const TableCell = ({ children, bgColor, fgColor, width, ...rest }) => {
  return (
    <TableContext.Consumer>
      {({ frozenColumnBGColor, frozenColumnFGColor, freezeFirstColumn, padding }) => (
        <>
          <TableCellStyled fgColor={fgColor} bgColor={bgColor} width={width} freezeFirstColumn={freezeFirstColumn} frozenColumnBGColor={frozenColumnBGColor} frozenColumnFGColor={frozenColumnFGColor} padding={padding}>{children}</TableCellStyled>
        </>
      )}
    </TableContext.Consumer>
  )
}

export const TableBody = ({ children, frozenColumnFGColor, zebraStripping, zebraStripeColor, ...rest }) => {
  return (
    <TableContext.Consumer>
      {({ frozenColumnWidth, freezeFirstColumn, tableBgColor, padding }) => (
        <TableBodyStyled bgColor={tableBgColor}  padding={padding} freezeFirstColumn={freezeFirstColumn} frozenColumnWidth={frozenColumnWidth}>
          {children}
        </TableBodyStyled>
      )}
    </TableContext.Consumer>
  )
}
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

TableCell.propTypes = {
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
}
