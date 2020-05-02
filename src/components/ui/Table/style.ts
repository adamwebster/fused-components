import styled, { css, FlattenSimpleInterpolation, ThemeProps, FlattenInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';

export const StyledTable = styled.table`
  display: flex;
  flex: 1 1;
  flex-flow: column;
  overflow: auto;
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.theme === 'dark' &&
    css`
      color: ${color.medium};
    `}
`;

interface THS {
  showBottomBorder?: boolean;
  freezeFirstColumn?: boolean;
  frozenColumnWidth?: string;
  padding?: string;
}

export const TableHeaderStyled = styled.thead<THS>`
  display: flex;
  flex: 1 1;
  font-weight: bold;
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.showBottomBorder &&
    css`
      border-bottom: solid 1px ${props.theme === 'dark' ? color.mediumdark : color.border};
      border-collapse: collapse;
    `}

  td:first-of-type {
    ${(props): false | FlattenSimpleInterpolation | undefined =>
      props.freezeFirstColumn &&
      css`
        border-bottom: solid 1px ${color.border};
      `}
  }
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.freezeFirstColumn &&
    css`
      width: fit-content;
      min-width: 100%;
      margin-left: ${`calc(${props.frozenColumnWidth} + (${props.padding} + 13px));`};
    `}
`;

interface TRS {
  zebraStriping?: boolean;
  zebraStripeColor?: string;
}

export const TableRowStyled = styled.tr<TRS>`
  display: flex;
  flex: 1 1;
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.zebraStriping &&
    css`
      &:nth-child(even) {
        background-color: ${props.zebraStripeColor};
      }
    `}
`;

interface TCS {
  padding?: string;
  frozenColumnBGColor?: string;
  frozenColumnFGColor?: string;
  freezeFirstColumn?: boolean;
}
export const TableCellStyled = styled.td<TCS>`
  display: flex;
  flex: 1 1;
  padding: ${(props): string | undefined => props.padding};
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.freezeFirstColumn &&
    css`
      &:first-child {
        background-color: ${color.medium};
        color: 'inherit';
        position: absolute;
        left: 0;
        border-right: solid 3px ${color.border};
      }
    `}
`;

interface TBS {
  freezeFirstColumn?: boolean;
  frozenColumnWidth?: string;
  padding?: string;
  highlightOnHover?: boolean;
}
export const TableBodyStyled = styled.tbody<TBS>`
  display: flex;
  flex: 1 1;
  flex-flow: column;

  ${({ highlightOnHover }): false | FlattenInterpolation<ThemeProps<any>> | undefined =>
    highlightOnHover &&
    css`
      tr:hover {
        background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.highlight)};
      }
    `}

  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.freezeFirstColumn &&
    css`
      width: fit-content;
      min-width: 100%;
      margin-left: ${`calc(${props.frozenColumnWidth} + (${props.padding} + 13px));`};
    `}
`;
