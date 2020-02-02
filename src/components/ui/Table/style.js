import styled, { css } from "styled-components";
import variables from "../../../styles/variables";

export const StyledTable = styled.div`
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

export const TableHeader = styled.div`
  display: flex;
  flex: 1 1;
  font-weight: bold;
  ${props =>
    props.headerBorder &&
    css`
      border-bottom: solid 1px ${variables.borderColor};
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
`;

export const TableRow = styled.div`
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

export const TableCell = styled.div`
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
        background-color: #f1f1f1;
        position: absolute;
        left: 0;
      }
    `}
`;

export const TableBody = styled.div`
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
`;

export const TableScroll = styled.div`
  width: fit-content;
  min-width: 100%;
  ${props =>
    props.freezeFirstColumn &&
    css`
      margin-left: ${`calc(${props.freezeFirstColumnWidth} + 10px);`};
    `}
`;
