import styled, { css, FlattenSimpleInterpolation, FlattenInterpolation, ThemedStyledProps } from 'styled-components';
import { color } from '../../../styles/styles';

interface TTWProps {
  trigger: string;
}

const arrowIconPosition = (props: STP) => {
  switch (props.position) {
    case 'top':
      return `${color.dark} transparent transparent transparent`;
    case 'right':
      return `transparent ${color.dark} transparent transparent`;
    default:
      return `${color.dark} transparent transparent transparent`;
  }
};

const arrowLeftPosition = (props: STP) => {
  switch (props.position) {
    case 'top':
      return `50%`;
    case 'right':
      return `-5px`;
    default:
      return `50%`;
  }
};

const arrowTopPosition = (props: STP) => {
  switch (props.position) {
    case 'top':
      return `100%`;
    case 'right':
      return `calc(50% - 5px)`;
    default:
      return `100%`;
  }
};

const tooltipTopPosition = (props: STP) => {
  switch (props.position) {
    case 'top':
      return `${props.divHeight - 5}px`;
    case 'right':
      return `${props.divHeight / 2 + 7}px`;
    default:
      return `${props.divHeight - 5}px`;
  }
};

const tooltipLeftPosition = (props: STP) => {
  switch (props.position) {
    case 'top':
      return `${props.leftPosition}px`;
    case 'right':
      return `${props.leftPosition}px`;
    default:
      return `${props.leftPosition}px`;
  }
};
export const ToolTipWrapper = styled.div<TTWProps>`
  position: relative;
  width: fit-content;
  ${({ trigger }): false | FlattenSimpleInterpolation =>
    trigger === 'click' &&
    css`
      cursor: pointer;
    `}
`;

interface STP {
  divHeight: number;
  leftPosition?: number;
  self?: any;
  position?: string;
}
export const StyledTooltip = styled.div<STP>`
  @keyframes fadeInTooltip {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: 0.2s ease-in-out 0s 1 fadeInTooltip;

  padding: 10px;
  font-size: 13px;
  box-sizing: border-box;
  position: absolute;
  white-space: nowrap;
  border-radius: 5px;
  ${({ self }): FlattenInterpolation<ThemedStyledProps<STP, any>> =>
    self &&
    css`
      top: ${tooltipTopPosition};
    `};
  ${({ self }): FlattenInterpolation<ThemedStyledProps<STP, any>> =>
    self &&
    css`
      left: ${tooltipLeftPosition};
    `};
  background-color: ${color.dark};
  color: ${color.light};
  &:after {
    content: ' ';
    position: absolute;
    top: ${arrowTopPosition}; /* At the bottom of the tooltip */
    left: ${arrowLeftPosition};
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${arrowIconPosition};
  }
`;
