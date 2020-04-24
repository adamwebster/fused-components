import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';
import { fcStyles } from '../../../common/types';
import { lighten, darken } from 'polished';
interface Props {
  /** Set the style of the badge */
  fcStyle?: fcStyles;
  theme: unknown;
  borderRadius: string;
}

export const StyledAlert = styled.div`
  color: ${(props): string => (props.theme === 'dark' ? color.medium : color.darker)};

  border-style: solid;
  border-width: 5px 1px 1px 1px;
  background-color: ${(props: Props): string => {
    switch (props.fcStyle) {
      case 'danger':
        return color.danger;
      case 'warning':
        return color.warning;
      case 'info':
        return color.info;
      case 'success':
        return color.success;
      default:
        return props.theme === 'dark' ? color.medium : color.light;
    }
  }};

  border-color: ${(props: Props): string => {
    switch (props.fcStyle) {
      case 'danger':
        return darken(0.1, color.danger);
      case 'warning':
        return lighten(0.1, color.warning);
      case 'info':
        return lighten(0.1, color.info);
      case 'success':
        return lighten(0.1, color.success);
      default:
        return color.dark;
    }
  }};
  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    display: inline-flex;
    align-content: center;
    color: ${(props: Props): string => {
      switch (props.fcStyle) {
        case 'danger':
          return color.lightest;
        case 'warning':
          return color.lightest;
        case 'info':
          return color.lightest;
        case 'success':
          return color.lightest;
        default:
          return color.dark;
      }
    }};
    svg {
      width: 20px;
      min-width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
  padding: 10px;
  ${(props: Props): '' | FlattenSimpleInterpolation =>
    props.borderRadius &&
    css`
      border-radius: 5px;
    `}
`;

export const Title = styled.span`
  top: -5px;
  margin-left: 5px;
  display: inline-block;
`;

interface ACP {
  fcStyle?: fcStyles;
  theme: unknown;
}

export const AlertContent = styled.div`
  color: ${(props: ACP): string => {
    switch (props.fcStyle) {
      case 'danger':
        return color.lightest;
      case 'warning':
        return color.lightest;
      case 'info':
        return color.lightest;
      case 'success':
        return color.lightest;
      default:
        return color.dark;
    }
  }};
`;
