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

export const TableHeaderStyled = styled.thead`
  display: flex;
  flex: 1 1;
  font-weight: bold;
  ${props =>
    props.showBottomBorder &&
    css`
      border-bottom: solid 1px ${color.border};
      border-collapse: collapse;
    `}
  ${props =>
    props.bgColor &&
    css`
      background-color: ${props.bgColor};
    `}
  ${props =>
    props.fgColor &&
    css`
      color: ${props.fgColor};
    `}

td:first-of-type{
${props =>
    props.freezeFirstColumn &&
    css`
    border-bottom: solid 1px ${color.border};
  `}

  ${props =>
    props.bgColor &&
    css`
      background-color: ${props.bgColor};
    `}
}
${props =>
    props.freezeFirstColumn &&
    css`
        width: fit-content;
        min-width: 100%;
        margin-left: ${`calc(${props.frozenColumnWidth} + 13px);`};
    `}
`;

export const TableRowStyled = styled.tr`
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

export const TableCellStyled = styled.td`
  display: flex;
  flex: 1 1;
  ${props =>
    props.width &&
    css`
      flex: unset;
      width: ${props.width};
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

export const TableBodyStyled = styled.tbody`
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
        margin-left: ${`calc(${props.frozenColumnWidth} + 13px);`};
    `}
`;
