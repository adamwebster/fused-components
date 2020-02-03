import styled, { css } from "styled-components";
import { color } from "../../../styles/styles";

export const StyledTable = styled.table`
  display: flex;
  flex: 1 1;
  flex-flow: column;
  overflow: auto;
  ${props =>
    props.tableBGColor &&
    css`
      background-color: ${props.tableBGColor};
    `}

  ${props =>
    props.tableTextColor &&
    css`
      color: ${props.tableTextColor};
    `}
`;

export const TableHeader = styled.thead`
  display: flex;
  flex: 1 1;
  font-weight: bold;
  ${props =>
    props.headerBorder &&
    css`
      border-bottom: solid 1px ${color.border};
      border-collapse: collapse;
    `}
  ${props =>
    props.tableHeaderBGColor &&
    css`
      background-color: ${props.tableHeaderBGColor};
    `}
  ${props =>
    props.textColor &&
    css`
      color: ${props.textColor};
    `}

td:first-of-type{
${props =>
    props.freezeFirstColumn &&
    css`
    border-bottom: solid 1px ${color.border};
  `}

  ${props =>
    props.tableHeaderBGColor &&
    css`
      background-color: ${props.tableHeaderBGColor};
    `}
}
${props =>
    props.freezeFirstColumn &&
    css`
        width: fit-content;
        min-width: 100%;
        margin-left: ${`calc(${props.freezeFirstColumnWidth} + 13px);`};
    `}
`;

export const TableRow = styled.tr`
  display: flex;
  flex: 1 1;
  ${props =>
    props.zebraStripping &&
    css`
      &:nth-child(odd) {
        background-color: ${props.zebraStripeColor};
      }
    `}
`;

export const TableCell = styled.td`
  display: flex;
  flex: 1 1;
  ${props =>
    props.cellWidth &&
    css`
      flex: unset;
      width: ${props.cellWidth};
    `};
  padding: ${props => props.cellPadding};
  ${props =>
    props.freezeFirstColumn &&
    css`
      &:first-child {
        background-color: ${color.medium};
        position: absolute;
        left: 0;
        border-right: solid 3px ${color.border};
      }
    `}
`;

export const TableBody = styled.tbody`
  display: flex;
  flex: 1 1;
  flex-flow: column;
  ${props =>
    props.tableBodyBGColor &&
    css`
      background-color: ${props.tableBodyBGColor};
    `}
  ${props =>
    props.tableBodyTextColor &&
    css`
      color: ${props.tableBodyTextColor};
    `}
    
    & tr:hover{
      background-color: ${color.highlight};
    }

  ${props =>
    props.freezeFirstColumn &&
    css`
        width: fit-content;
        min-width: 100%;
        margin-left: ${`calc(${props.freezeFirstColumnWidth} + 13px);`};
    `}
`;
