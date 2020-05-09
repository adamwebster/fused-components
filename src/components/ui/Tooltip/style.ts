import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';

interface TWProps {
  triggerEvent: 'click' | 'mouseOver' | undefined;
}
export const TooltipWrapper = styled.div<TWProps>`
  display: inline-block;
  position: relative;
  ${({ triggerEvent }): false | FlattenSimpleInterpolation =>
    triggerEvent === 'click' &&
    css`
      cursor: pointer;
    `}
`;

export const TooltipButton = styled.button``;

export const TooltipStyled = styled.div`
  font-size: 12px;
  text-align: left;
  @keyframes fadeInTooltip {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: 0.2s ease-in-out 0s 1 fadeInTooltip;
  background: ${color.dark};
  color: ${color.light};
  padding: 10px;
  border-radius: 5px;
  z-index: 1;
  .tooltip-arrow,
  .tooltip-arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: -1;
  }
  .tooltip-arrow::before {
    content: '';
    transform: rotate(45deg);
    background: ${color.dark};
  }

  &[data-popper-placement^='top'] {
    .tooltip-arrow {
      bottom: -4px;
    }
  }

  &[data-popper-placement^='bottom'] {
    .tooltip-arrow {
      top: -4px;
    }
  }

  &[data-popper-placement^='left'] {
    .tooltip-arrow {
      right: -4px;
    }
  }

  &[data-popper-placement^='right'] {
    .tooltip-arrow {
      left: -4px;
    }
  }
`;
