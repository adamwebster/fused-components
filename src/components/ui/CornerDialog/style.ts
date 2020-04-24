import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';
import { darken, lighten } from 'polished';

import { fcStyles } from '../../../common/types';

export interface Props {
  /** Set the style of the badge */
  fcStyle?: fcStyles;
  theme?: unknown;
  visible?: boolean;
  fixed?: boolean;
}
const colorValue = (props: Props): string => {
  switch (props.fcStyle) {
    case 'danger':
      return props.theme === 'dark' ? lighten(0.1, color.danger) : color.danger;
    case 'warning':
      return props.theme === 'dark' ? lighten(0.1, color.warning) : color.warning;
    case 'info':
      return props.theme === 'dark' ? lighten(0.3, color.info) : color.info;
    case 'success':
      return props.theme === 'dark' ? lighten(0.1, color.success) : color.success;
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
      return props.theme === 'dark' ? lighten(0.1, color.danger) : color.danger;
    case 'warning':
      return color.warning;
    case 'info':
      return color.info;
    case 'success':
      return color.success;
    default:
      return props.theme === 'dark' ? color.darkModeMedium : color.border;
  }
};

export const CornerDialogStyled = styled.div`
  max-width: 320px;
  ${(props: Props): FlattenSimpleInterpolation =>
    props.fixed
      ? css`
          position: fixed;
          bottom: 25px;
          right: 25px;
          animation: ${!props.visible ? 'hide 0.2s ease-in-out' : 'bounceup 0.5s ease-in-out'};
        `
      : css`
          position: relative;
          margin-right: 25px;
        `}
  background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDarker : '#fff')};
  color: ${(props): string => (props.theme === 'dark' ? color.medium : color.darker)};

  border-radius: 5px;
  border: solid 1px ${borderColor};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  z-index: 99;

  @keyframes bounceup {
    0% {
      bottom: -200px;
    }
    50% {
      bottom: 50px;
    }
    60% {
      bottom: 0;
    }
    100% {
      bottom: 25px;
    }
  }

  @keyframes hide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const DialogTitle = styled.h3`
  border-bottom: solid 1px ${borderColor};
  padding: 10px;
  box-sizing: border-box;
  margin: 0;
  color: ${colorValue};
`;

export const DialogContent = styled.div`
  padding: 20px 10px;
  box-sizing: border-box;
  display: flex;
`;

export const DialogText = styled.div``;

export const DialogFooter = styled.div`
  border-top: solid 1px ${borderColor};
  padding: 10px;
  box-sizing: border-box;
  text-align: right;
  button {
    display: inline-block;
    width: calc(50% - 5px);
    &:first-child {
      margin-right: 10px;
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

export const IconStyled = styled.div`
  margin-right: 15px;
  display: block;
  svg {
    width: 32px;
    color: ${colorValue};
  }
`;
