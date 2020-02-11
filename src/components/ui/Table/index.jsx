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
  cellPadding,
  zebraStripping,
  zebraStripeColor,
  tableBGColor,
  tableTextColor,
  freezeFirstColumn,
  children,
  frozenColumnWidth,
  ...rest
}) => {
  return (
    <>
      <StyledTable
        tableTextColor={tableTextColor && tableTextColor}
        tableBGColor={tableBGColor && tableBGColor}
      >
        {React.Children.map(children, child => {
          return React.cloneElement(child, {cellPadding, freezeFirstColumn, zebraStripping, zebraStripeColor, frozenColumnWidth })
        })}
      </StyledTable>
    </>
  );
};

export const TableHeader = ({ fgColor, cellPadding, freezeFirstColumn, frozenColumnWidth, showBottomBorder, bgColor, children, ...rest }) => {
  return (
    <TableHeaderStyled
      showBottomBorder={showBottomBorder}
      bgColor={bgColor}
      fgColor={fgColor}
      freezeFirstColumn={freezeFirstColumn}
      frozenColumnWidth={frozenColumnWidth}
      {...rest}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {cellPadding,  freezeFirstColumn })
      })}
    </TableHeaderStyled>
  )
}

export const TableRow = ({ children, cellPadding, zebraStripeColor, zebraStripping, freezeFirstColumn, ...rest }) => {
  return (
    <TableRowStyled
    freezeFirstColumn={freezeFirstColumn}
    zebraStripping={zebraStripping}
    zebraStripeColor={zebraStripeColor}
    >
      {console.log(freezeFirstColumn)}
      {React.Children.map(children, child => {
        return React.cloneElement(child, {cellPadding, freezeFirstColumn })
      })}
    </TableRowStyled>
  )
}

const TableCell = ({ children, cellPadding, width, freezeFirstColumn, ...rest }) => {
  return (
    <>
      <TableCellStyled width={width} freezeFirstColumn={freezeFirstColumn} cellPadding={cellPadding}>{children}</TableCellStyled>
    </>
  )
}

const TableBody = ({ children, freezeFirstColumn, cellPadding, frozenColumnWidth,  zebraStripping, zebraStripeColor, ...rest }) => {
  return (
    <TableBodyStyled freezeFirstColumn={freezeFirstColumn} frozenColumnWidth={frozenColumnWidth}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {cellPadding, freezeFirstColumn, zebraStripping, zebraStripeColor })
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
  cellPadding: PropTypes.string,
  /** Sets the table header background color */
  zebraStripping: PropTypes.bool,
  /** Sets the zebra stripe color */
  zebraStripeColor: PropTypes.string,
  /** Sets the table background color */
  tableBGColor: PropTypes.string,
  /** Sets the table text color */
  tableTextColor: PropTypes.string,
  freezeFirstColumn: PropTypes.bool,
};

Table.defaultProps = {
  cellPadding: "5px",
  zebraStripping: false,
  zebraStripeColor: "#ebebeb",
  freezeFirstColumn: false,
};

TableHeader.defaultProps= {
  showBottomBorder: true,
}

TableHeader.propTypes = {
  showBottomBorder: PropTypes.bool,
}
