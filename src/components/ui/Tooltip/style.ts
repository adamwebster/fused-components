import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';

export const ToolTipWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

interface STP {
  divHeight: number;
  leftPosition: number;
  self?: any;
}
export const StyledTooltip = styled.div<STP>`
  padding: 10px;
  font-size: 13px;
  box-sizing: border-box;
  position: absolute;
  white-space: nowrap;
  border-radius: 5px;
  ${({ divHeight, self }): FlattenSimpleInterpolation =>
    self &&
    css`
      top: ${divHeight - 5}px;
    `};
  ${({ leftPosition, self }): FlattenSimpleInterpolation =>
    self &&
    css`
      left: ${leftPosition}px;
    `};
  background-color: ${color.dark};
  color: ${color.light};
  &:after {
    content: ' ';
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${color.dark} transparent transparent transparent;
  }
`;
