import React from "react";
import {
  StyledTable,
  TableHeader,
  TableCell,
  TableBody,
  TableRow
} from "./style";
import PropTypes from "prop-types";
import SampleTableData from "../../../data/SampleTableData";
export const Table = ({
  cellPadding,
  tableHeaderBGColor,
  tableHeaderTextColor,
  zebraStripping,
  zebraStripeColor,
  tableBodyBGColor,
  tableBodyTextColor,
  tableBGColor,
  tableTextColor,
}) => {
  console.log(SampleTableData);
  return (
    <StyledTable
      tableTextColor={tableTextColor && tableTextColor}
      tableBGColor={tableBGColor && tableBGColor}
    >
      <TableHeader
        textColor={tableHeaderTextColor && tableHeaderTextColor}
        tableHeaderBGColor={tableHeaderBGColor && tableHeaderBGColor}
      >
        {SampleTableData.headers.map((header, index) => {
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
        {SampleTableData.rows.map((row, index) => {
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
                      SampleTableData.headers[index].width &&
                      SampleTableData.headers[index].width
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
  data: PropTypes.object,
  cellPadding: PropTypes.string,
  tableHeaderBGColor: PropTypes.string,
  tableHeaderTextColor: PropTypes.string,
  zebraStripping: PropTypes.bool,
  zebraStripeColor: PropTypes.string,
  tableBodyBGColor: PropTypes.string,
  tableBodyTextColor: PropTypes.string,
  tableBGColor: PropTypes.string,
  tableTextColor: PropTypes.string,
};

Table.defaultProps = {
  cellPadding: "5px",
  zebraStripping: false,
  zebraStripeColor: "#ebebeb"
};
