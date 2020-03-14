import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';
import { Props } from './';
import { fcStyles } from '../../../common/types';
import { lighten, darken } from 'polished';
import { ReactNode } from 'react';

const colorValue = (props: Props): string => {
  switch (props.fcStyle) {
    case 'danger':
      return props.theme === 'dark' ? lighten(0.1, color.red) : color.red;
    case 'warning':
      return color.yellow;
    case 'info':
      return color.blue;
    case 'success':
      return color.green;
    default:
      if (props.theme === 'dark') {
        return color.medium;
      } else {
        return color.dark;
      }
  }
};

const borderColor = (props: Props): string => {
  switch (props.fcStyle) {
    case 'danger':
      return props.theme === 'dark' ? lighten(0.1, color.red) : color.red;
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

export interface SD extends React.HTMLProps<HTMLDivElement> {
  fixed?: boolean;
  visible?: boolean;
  boxShadow?: boolean;
  fcStyle?: fcStyles;
}

export const StyledDialog = styled.div<SD>`
  border-radius: 5px;
  background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDark : '#fff')};
  border: solid 1px ${borderColor};
  z-index: 98;
  width: 500px;

  ${(props: SD): FlattenSimpleInterpolation =>
    props.fixed
      ? css`
          position: fixed;
          margin: 0 auto;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 99;
          animation: ${!props.visible ? 'hide 0.2s ease-in-out' : 'popin 0.2s'};
        `
      : css`
          position: relative;
          margin-right: 25px;
        `}

  @keyframes popin {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
    }
    70% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    85% {
      transform: translate(-50%, -50%) scale(0.95);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  ${(props: SD): false | FlattenSimpleInterpolation | undefined =>
    props.boxShadow &&
    css`
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    `}
`;

export interface DT extends React.HTMLProps<HTMLDivElement> {
  fcStyle?: fcStyles;
  children: ReactNode;
}
export const DialogTitle = styled.div<DT>`
  border-bottom: solid 1px ${borderColor};
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  h2 {
    margin: 0;
    width: calc(100% - 40px);
    color: ${(props: DT): string => colorValue(props)};
  }
`;

export const DialogContent = styled.div`
  padding: 10px;
  box-sizing: border-box;
  color: ${(props): string => (props.theme === 'dark' ? color.medium : 'inherit')};
`;

interface Footer extends React.HTMLProps<HTMLDivElement> {
  fcStyle?: fcStyles;
}
export const DialogFooter = styled.div<Footer>`
  border-top: solid 1px ${borderColor};
  padding: 10px;
  box-sizing: border-box;
  text-align: right;
  button {
    display: inline-block;
    &:last-child {
      margin-left: 10px;
    }
  }
`;

export const CloseButton = styled.button`
  right: 15px;
  top: 12px;
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
  background-color: ${color.darkest};
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  opacity: 0.5;
  z-index: 99;
  animation: fadeIn 0.2s ease-in;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`;
