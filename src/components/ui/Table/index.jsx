import React from 'react';
import { StyledTable } from './style';
import PropTypes from 'prop-types';
import SampleTableData from '../../../data/SampleTableData';
export const Table = () => {
  console.log(SampleTableData);
  return(
    <StyledTable>Table</StyledTable>
  )
}

Table.propTypes = {
  data: PropTypes.object,
}