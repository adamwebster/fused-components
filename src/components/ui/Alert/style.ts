import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';
import { fcStyles } from '../../../common/types';

interface Props {
  /** Set the style of the badge */
  fcStyle?: fcStyles;
  theme: unknown;
  borderRadius: boolean;
}

export const StyledAlert = styled.div`
  color: ${(props): string => (props.theme === 'dark' ? color.medium : color.darker)};

  border-style: solid;
  border-width: 10px 1px 1px 1px;
  background-color: ${(props): string => (props.theme === 'dark' ? color.darkModeDark : '#fff')};
  border-color: ${(props: Props): string => {
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
        return props.theme === 'dark' ? '#fff' : color.dark;
    }
  }};
  header {
    margin-top: 0;
    margin-bottom: 10px;
    display: inline-flex;
    align-content: center;
    font-size: 14px;
  }
  svg.notification-icon {
    width: 20px;
    min-width: 20px;
    height: 20px;
    margin-right: 5px;
    color: ${(props: Props): string => {
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
          return props.theme === 'dark' ? '#fff' : color.dark;
      }
    }};
  }
  padding: 10px;
  ${(props: Props): false | FlattenSimpleInterpolation =>
    props.borderRadius &&
    css`
      border-radius: 5px;
    `}
`;

export const Title = styled.span`
  top: -5px;
  margin-left: 5px;
  font-size: 14px;
  display: inline-block;
  font-weight: bold;
  display: inline-block;
`;

interface ACP {
  fcStyle?: fcStyles;
  theme: unknown;
}

export const AlertContent = styled.div`
  color: ${(props: ACP): string => (props.theme === 'dark' ? '#fff' : color.dark)};
`;
