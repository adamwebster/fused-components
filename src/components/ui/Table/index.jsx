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
export const Table = ({ cellPadding }) => {
  console.log(SampleTableData);
  return (
    <StyledTable>
      <TableHeader>
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
      <TableBody>
        {SampleTableData.rows.map((row, index) => {
          return (
            <TableRow key={index}>
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
  cellPadding: PropTypes.string
};

Table.defaultProps = {
  cellPadding: "5px"
};
