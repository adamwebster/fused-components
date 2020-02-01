import styled, { css } from "styled-components";
import variables from "../../../styles/variables";

export const StyledTable = styled.div`
  display: flex;
  flex: 1 1;
  flex-flow: column;
`;

export const TableHeader = styled.div`
  display: flex;
  flex: 1 1;
  border-bottom: solid 1px ${variables.borderColor};
`;

export const TableRow = styled.div`
  display: flex;
  flex: 1 1;
`;

export const TableCell = styled.div`
  display: flex;
  flex: 1 1;
${props => props.cellWidth && css`
flex: unset;
width: ${props.cellWidth};
`};
  padding: ${props => props.cellPadding};
`;

export const TableBody = styled.div`
  display: flex;
  flex: 1 1;
  flex-flow: column;
`;
