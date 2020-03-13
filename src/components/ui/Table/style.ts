import styled, { css } from "styled-components";
import { color } from "../../../styles/styles";
import { darken } from "polished";

interface ST {
  bgColor?: string;
  fgColor?: string;
}
export const StyledTable = styled.table<ST>`
  display: flex;
  flex: 1 1;
  flex-flow: column;

  overflow: auto;
  ${props =>
    props.bgColor &&
    css`
      background-color: ${props.bgColor};
    `}
    
 ${props =>
   props.theme === "dark" &&
   css`
     color: ${color.medium};
   `}
  ${props =>
    props.fgColor &&
    css`
      color: ${props.fgColor};
    `}
`;

interface THS {
  showBottomBorder?: boolean;
  bgColor?: string;
  fgColor?: string;
  freezeFirstColumn?: boolean;
  frozenColumnWidth?: string;
  padding?: string;
}

export const TableHeaderStyled = styled.thead<THS>`
  display: flex;
  flex: 1 1;
  font-weight: bold;
  ${props =>
    props.showBottomBorder &&
    css`
      border-bottom: solid 1px
        ${props.theme === "dark" ? color.mediumdark : color.border};
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
}
${props =>
  props.freezeFirstColumn &&
  css`
    width: fit-content;
    min-width: 100%;
    margin-left: ${`calc(${props.frozenColumnWidth} + (${props.padding} + 13px));`};
  `}
`;

interface TRS {
  zebraStripping?: boolean;
  zebraStripeColor?: string;
  bgColor?: string;
}

export const TableRowStyled = styled.tr<TRS>`
  display: flex;
  flex: 1 1;
  ${props =>
    props.zebraStripping &&
    css`
      &:nth-child(even) {
        background-color: ${props.zebraStripeColor};
      }
    `}
  ${props =>
    props.bgColor &&
    css`
      background-color: ${props.bgColor};
    `}
`;

interface TCS {
  width?: string;
  padding?: string;
  bgColor?: string;
  fgColor?: string;
  frozenColumnBGColor?: string;
  frozenColumnFGColor?: string;
  freezeFirstColumn?: boolean;
}
export const TableCellStyled = styled.td<TCS>`
  display: flex;
  flex: 1 1;
  ${props =>
    props.width &&
    css`
      flex: unset;
      width: ${props.width};
    `};
  padding: ${props => props.padding};
  ${props =>
    props.freezeFirstColumn &&
    css`
      &:first-child {
        background-color: ${props.frozenColumnBGColor
          ? props.frozenColumnBGColor
          : color.medium};
        color: ${props.frozenColumnFGColor
          ? props.frozenColumnFGColor
          : "inherit"};
        position: absolute;
        left: 0;
        border-right: solid 3px ${color.border};
      }
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
`;

interface TBS {
  tableBodyBGColor?: string;
  tableBodyTextColor?: string;
  bgColor?: string;
  freezeFirstColumn?: boolean;
  frozenColumnWidth?: string;
  padding?: string;
}
export const TableBodyStyled = styled.tbody<TBS>`
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
    
    & tr:hover {
    background-color: ${props =>
      props.bgColor
        ? darken(0.1, props.bgColor)
        : props.theme === "dark"
        ? color.darkModeMedium
        : color.highlight};
  }

  ${props =>
    props.freezeFirstColumn &&
    css`
      width: fit-content;
      min-width: 100%;
      margin-left: ${`calc(${props.frozenColumnWidth} + (${props.padding} + 13px));`};
    `}
`;
