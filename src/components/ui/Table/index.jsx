import React from "react";
import {
  StyledTable,
  TableHeader,
  TableCell,
  TableBody,
  TableRow
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
}) => {
  return (
    <StyledTable
      tableTextColor={tableTextColor && tableTextColor}
      tableBGColor={tableBGColor && tableBGColor}
    >
      <TableHeader
        textColor={tableHeaderTextColor && tableHeaderTextColor}
        tableHeaderBGColor={tableHeaderBGColor && tableHeaderBGColor}
        headerBorder={headerBorder}
      >
        {data.headers.map((header, index) => {
          console.log(header.width);
          return (
            <TableCell
              cellWidth={header.width && header.width}
              cellPadding={cellPadding}
              key={index}
            >
              {header.label}
            </TableCell>
          );
        })}
      </TableHeader>
      <TableBody
        tableBodyTextColor={tableBodyTextColor && tableBodyTextColor}
        tableBodyBGColor={tableBodyBGColor && tableBodyBGColor}
      >
        {data.rows.map((row, index) => {
          return (
            <TableRow
              zebraStripeColor={zebraStripeColor}
              zebraStripping={zebraStripping}
              key={index}
            >
              {row.row.map((column, index) => {
                return (
                  <TableCell
                    cellWidth={
                      data.headers[index].width &&
                      data.headers[index].width
                    }
                    cellPadding={cellPadding}
                    key={index}
                  >
                    {column}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </StyledTable>
  );
};

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
};

Table.defaultProps = {
  cellPadding: "5px",
  zebraStripping: false,
  zebraStripeColor: "#ebebeb",
  headerBorder: true,
  data: {headers: [], rows: []}
};
