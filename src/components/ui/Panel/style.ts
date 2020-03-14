import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';
import { fcStyles } from '../../../common/types';
import { darken } from 'polished';

interface Props {
  /** Set the style of the badge */
  fcStyle?: fcStyles;
  theme?: unknown;
}

const colorValue = (props: Props): string => {
  switch (props.fcStyle) {
    case 'danger':
      return color.red;
    case 'warning':
      return color.yellow;
    case 'info':
      return color.blue;
    case 'success':
      return color.green;
    default:
      return props.theme === 'dark' ? color.medium : color.dark;
  }
};

const borderColor = (props: Props): string => {
  switch (props.fcStyle) {
    case 'danger':
      return color.red;
    case 'warning':
      return color.yellow;
    case 'info':
      return color.blue;
    case 'success':
      return color.green;
    default:
      return props.theme === 'dark' ? color.darkModeMedium : color.border;
  }
};

export interface SP extends React.HTMLProps<HTMLDivElement> {
  fixed: boolean;
  position: 'left' | 'right';
  visible: boolean;
  fcStyle?: fcStyles;
}

export const StyledPanel = styled.div<SP>`
  border-radius: 5px;
  background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDark : '#fff')};
  border: solid 1px ${borderColor};

  color: ${(props): string => (props.theme === 'dark' ? color.medium : color.darker)};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  height: calc(100vh - 50px);
  width: 300px;
  display: flex;
  flex-flow: column;
  z-index: 99;
  ${(props): false | FlattenSimpleInterpolation | undefined =>
    props.fixed
      ? css`
          position: fixed;
          top: 25px;
          ${props.position === 'right' ? 'right: 25px;' : 'left: 25px;'}
          animation: ${
            !props.visible
              ? `${props.position === 'right' ? 'bounceout' : 'bounceoutleft'} 0.5s ease-in-out`
              : `${props.position === 'right' ? 'bouncein' : 'bounceinleft'} 0.5s ease-in-out`
          };
          `
      : css`
          position: relative;
          margin-right: 25px;
        `}

  @keyframes bouncein {
    0% {
      right: -400px;
    }
    100% {
      right: 25px;
    }
  }

  @keyframes bounceinleft {
    0% {
      left: -400px;
    }
    100% {
      left: 25px;
    }
  }

  @keyframes bounceoutleft {
    0% {
      left: 25px;
    }
    100% {
      left: -400px;
    }
  }

  @keyframes bounceout {
    0% {
      right: 25px;
    }
    100% {
      right: -400px;
    }
  }
`;

export interface DT {
  fcStyle?: fcStyles;
  children: unknown;
}

export const DialogTitle = styled.h3<DT>`
  border-bottom: solid 1px ${borderColor};
  padding: 10px;
  box-sizing: border-box;
  margin: 0;
  height: fit-content;

  color: ${(props: DT): string => colorValue(props)};
`;

export const DialogContent = styled.div`
  padding: 20px 10px;
  box-sizing: border-box;
  display: flex;
  flex: 1 1;
  overflow: auto;
  p:first-of-type {
    margin-top: 0;
  }
`;

export const DialogText = styled.div``;

interface Footer {
  fcStyle?: fcStyles;
  theme?: unknown;
  children?: unknown;
}
export const DialogFooter = styled.div<Footer>`
  border-top: solid 1px ${borderColor};
  padding: 10px;
  box-sizing: border-box;
  text-align: right;
  height: fit-content;
  button {
    display: inline-block;
    &:last-child {
      margin-left: 10px;
    }
  }
`;

export const CloseButton = styled.button`
  right: 10px;
  top: 10px;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: bold;
  color: ${(props): string => (props.theme === 'dark' ? color.darkModeMedium : color.mediumdark)};
  position: absolute;
  cursor: pointer;
  &:hover {
    color: ${(props): string => (props.theme === 'dark' ? darken(0.1, color.darkModeMedium) : color.dark)};
  }
  svg {
    width: 16px;
  }
`;

export const Overlay = styled.div`
  background-color: ${color.overlay};
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 99;
  animation: fadeIn 0.1s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`;
