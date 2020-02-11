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
  data,
  cellPadding,
  tableHeaderBGColor,
  tableHeaderTextColor,
  zebraStripping,
  zebraStripeColor,
  tableBodyBGColor,
  tableBodyTextColor,
  tableBGColor,
  tableTextColor,
  headerBorder,
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
          return React.cloneElement(child, { freezeFirstColumn, zebraStripping, zebraStripeColor, frozenColumnWidth })
        })}
      </StyledTable>
    </>
  );
};

export const TableHeader = ({ fgColor, freezeFirstColumn, frozenColumnWidth, showBottomBorder, bgColor, children, ...rest }) => {
  return (
    <TableHeaderStyled
      showBottomBorder={showBottomBorder}
      bgColor={bgColor}
      fgColor={fgColor}
      freezeFirstColumn={freezeFirstColumn}
      frozenColumnWidth={frozenColumnWidth}
      {...rest}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, { freezeFirstColumn })
      })}
    </TableHeaderStyled>
  )
}

export const TableRow = ({ children, zebraStripeColor, zebraStripping, freezeFirstColumn, ...rest }) => {
  return (
    <TableRowStyled
    freezeFirstColumn={freezeFirstColumn}
    zebraStripping={zebraStripping}
    zebraStripeColor={zebraStripeColor}
    >
      {console.log(freezeFirstColumn)}
      {React.Children.map(children, child => {
        return React.cloneElement(child, { freezeFirstColumn })
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

const TableBody = ({ children, freezeFirstColumn, frozenColumnWidth,  zebraStripping, zebraStripeColor, ...rest }) => {
  return (
    <TableBodyStyled freezeFirstColumn={freezeFirstColumn} frozenColumnWidth={frozenColumnWidth}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, { freezeFirstColumn, zebraStripping, zebraStripeColor })
      })}
    </TableBodyStyled>
  )
}
Table.Header = TableHeader;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Body = TableBody;

Table.propTypes = {
  /** Send data to the table */
  data: PropTypes.object,
  /** Sets the padding for the cells */
  cellPadding: PropTypes.string,
  /** Sets the table header background color */
  tableHeaderBGColor: PropTypes.string,
  /** Sets the table header text color */
  tableHeaderTextColor: PropTypes.string,
  /** Set to display zebra stripping of the table */
  zebraStripping: PropTypes.bool,
  /** Sets the zebra stripe color */
  zebraStripeColor: PropTypes.string,
  /** Sets the table body background color */
  tableBodyBGColor: PropTypes.string,
  /** Sets the table body text color */
  tableBodyTextColor: PropTypes.string,
  /** Sets the table background color */
  tableBGColor: PropTypes.string,
  /** Sets the table text color */
  tableTextColor: PropTypes.string,
  /** Displays the header rows bottom border */
  headerBorder: PropTypes.bool,
  freezeFirstColumn: PropTypes.bool,
};

Table.defaultProps = {
  cellPadding: "5px",
  zebraStripping: false,
  zebraStripeColor: "#ebebeb",
  headerBorder: true,
  freezeFirstColumn: false,
  data: { headers: [], rows: [] }
};

TableHeader.defaultProps= {
  showBottomBorder: true,
}

TableHeader.propTypes = {
  showBottomBorder: PropTypes.bool,
}

Table.Cell.propTypes = {
  cellPadding: PropTypes.bool,
}

Table.Cell.defaultProps = {
  cellPadding: '5px',
}