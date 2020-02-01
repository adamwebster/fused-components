import styled, { css } from "styled-components";
import variables from "../../../styles/variables";

export const StyledTable = styled.div`
  display: flex;
  flex: 1 1;
  flex-flow: column;
    ${props => props.tableBGColor && css`
        background-color: ${props.tableBGColor};
    `}

    ${props => props.tableTextColor && css`
        color: ${props.tableTextColor};
    `}
`;

export const TableHeader = styled.div`
  display: flex;
  flex: 1 1;
  font-weight: bold;
  ${props => props.headerBorder && css`border-bottom: solid 1px ${variables.borderColor};`}
  ${props => props.tableHeaderBGColor && css`
    background-color: ${props.tableHeaderBGColor};
  `}
  ${props => props.textColor && css`
    color: ${props.textColor};
  `}
`;

export const TableRow = styled.div`
  display: flex;
  flex: 1 1;
  ${props => props.zebraStripping && css`
    &:nth-child(odd){
        background-color: ${props.zebraStripeColor};
    }
    `
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
`;

export const TableBody = styled.div`
  display: flex;
  flex: 1 1;
  flex-flow: column;
  ${props => props.tableBodyBGColor && css`
    background-color: ${props.tableBodyBGColor};
  `}
  ${props => props.tableBodyTextColor && css`
    color: ${props.tableBodyTextColor};
  `}
`;
