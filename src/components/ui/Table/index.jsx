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
export const Table = () => {
  console.log(SampleTableData);
  return (
    <StyledTable>
      <TableHeader>
        {SampleTableData.headers.map((header, index) => {
          return <TableCell key={index}>{header.label}</TableCell>;
        })}
      </TableHeader>
      <TableBody>
        {SampleTableData.rows.map((row, index) => {
          return (
            <TableRow key={index}>
              {row.row.map((column, index) => {
                return <TableCell key={index}>{column}</TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </StyledTable>
  );
};

Table.propTypes = {
  data: PropTypes.object
};
