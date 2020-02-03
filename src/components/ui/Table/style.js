import styled, { css } from "styled-components";
import { color } from "../../../styles/styles";

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

div:first-of-type{
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
    &:hover{
      background-color: ${color.highlight}
    }
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
        border-right: solid 3px ${color.border};
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
      margin-left: ${`calc(${props.freezeFirstColumnWidth} + 13px);`};
    `}
`;
