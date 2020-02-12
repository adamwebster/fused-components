import React from "react";
import {
  StyledTable,
  TableHeaderStyled,
  TableCellStyled,
  TableBodyStyled,
  TableRowStyled,
} from "./style";
import PropTypes from "prop-types";

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
  ...rest
}) => {
  return (
    <>
      <StyledTable
        fgColor={fgColor && fgColor}
        bgColor={bgColor && bgColor}
      >
        {React.Children.map(children, child => {
          return React.cloneElement(child, {padding, frozenColumnBGColor, frozenColumnFGColor, freezeFirstColumn, zebraStripping, zebraStripeColor, frozenColumnWidth, tableBgColor: bgColor })
        })}
      </StyledTable>
    </>
  );
};

export const TableHeader = ({ fgColor, padding, freezeFirstColumn, frozenColumnWidth, frozenColumnFGColor, frozenColumnBGColor, showBottomBorder, bgColor, children, ...rest }) => {
  return (
    <TableHeaderStyled
      showBottomBorder={showBottomBorder}
      bgColor={bgColor}
      fgColor={fgColor}
      padding={padding}
      freezeFirstColumn={freezeFirstColumn}
      frozenColumnWidth={frozenColumnWidth}
      {...rest}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {padding, frozenColumnBGColor, frozenColumnFGColor, freezeFirstColumn })
      })}
    </TableHeaderStyled>
  )
}

export const TableRow = ({ children, padding, frozenColumnBGColor, frozenColumnFGColor, zebraStripeColor, zebraStripping, freezeFirstColumn, ...rest }) => {
  return (
    <TableRowStyled
    freezeFirstColumn={freezeFirstColumn}
    zebraStripping={zebraStripping}
    zebraStripeColor={zebraStripeColor}
    >
      {console.log(freezeFirstColumn)}
      {React.Children.map(children, child => {
        return React.cloneElement(child, {padding, frozenColumnFGColor, frozenColumnBGColor, freezeFirstColumn })
      })}
    </TableRowStyled>
  )
}

export const TableCell = ({ children, padding, frozenColumnBGColor, frozenColumnFGColor, bgColor, fgColor, width, freezeFirstColumn, ...rest }) => {
  return (
    <>
      <TableCellStyled fgColor={fgColor} bgColor={bgColor} width={width} freezeFirstColumn={freezeFirstColumn} frozenColumnBGColor={frozenColumnBGColor} frozenColumnFGColor={frozenColumnFGColor} padding={padding}>{children}</TableCellStyled>
    </>
  )
}

export const TableBody = ({ children, tableBgColor, freezeFirstColumn, frozenColumnFGColor, frozenColumnBGColor, padding, frozenColumnWidth,  zebraStripping, zebraStripeColor, ...rest }) => {
  return (
    <TableBodyStyled bgColor={tableBgColor} padding={padding} freezeFirstColumn={freezeFirstColumn} frozenColumnWidth={frozenColumnWidth}>
      {console.log(tableBgColor)}
      {React.Children.map(children, child => {
        return React.cloneElement(child, {padding, frozenColumnFGColor, frozenColumnBGColor, freezeFirstColumn, zebraStripping, zebraStripeColor })
      })}
    </TableBodyStyled>
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

TableHeader.defaultProps= {
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
