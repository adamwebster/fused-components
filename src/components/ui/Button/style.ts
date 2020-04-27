import styled, { css, FlattenInterpolation, FlattenSimpleInterpolation, ThemedStyledProps } from 'styled-components';
import { color } from '../../../styles/styles';
import { darken } from 'polished';
import { Props } from './';
import { fcStyles } from '../../../common/types';
import { RefObject } from 'react';

interface ColorProps {
  theme?: unknown;
  buttonColor?: string;
  fcStyle?: fcStyles;
}
const colorValue = (props: ColorProps): string => {
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
      return props.buttonColor || color.primary;
  }
};

const colorValueDarken = (props: Props): string => {
  switch (props.fcStyle) {
    case 'danger':
      return darken(0.1, color.danger);
    case 'warning':
      return darken(0.1, color.warning);
    case 'info':
      return darken(0.1, color.info);
    case 'success':
      return darken(0.1, color.success);
    default:
      return darken(0.1, props.buttonColor || color.primary);
  }
};

export const StyledIcon = styled.span`
  background-color: rgba(0, 0, 0, 0.2);
  margin-right: 5px;
  padding: 5px;
  font-size: 14px;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  color: #fff;
  ${(props: Props): false | FlattenInterpolation<ThemedStyledProps<ColorProps, unknown>> =>
    !props.primary &&
    css`
      background-color: ${colorValue};
    `}
`;

interface SB extends React.HTMLAttributes<HTMLButtonElement> {
  ref?: RefObject<HTMLButtonElement>;
  icon?: string;
  buttonColor?: string;
  disabled?: boolean;
  primary?: boolean;
  fcStyle?: fcStyles;
  theme?: unknown;
  renderAs?: string;
}
export const StyledButton = styled.button<SB>`
  vertical-align: middle;
  padding: 0 10px;
  box-sizing: border-box;
  height: 34px;
  cursor: pointer;
  outline: 0;
  position:relative;
  border-radius: 5px;
  transition: all 0.2s ease;
  ${(props): false | FlattenInterpolation<ThemedStyledProps<ColorProps, unknown>> =>
    !props.primary &&
    css`
      background-color: transparent;
      color: ${colorValue || color.primary};
      border: solid 1px ${colorValue};
      &:hover:not(:disabled) {
        color: #fff;
        border-color: ${colorValueDarken};
        background-color: ${colorValue};
        transform: scale(1.05);
      }
      &:active:not(:disabled) {
        transform: scale(0.95);
      }
      &:disabled {
        border-color: ${color.mediumdark};
        color: ${color.mediumdark};
        transition: none;
        cursor: not-allowed;
        ${StyledIcon} {
          background-color: ${color.mediumdark};
        }
      }
    `}
    ${(props): false | FlattenInterpolation<ThemedStyledProps<ColorProps, unknown>> | undefined =>
      props.primary &&
      css`
        background-color: ${colorValue};
        color: ${color.light};
        border: none;
        &:hover:not(:disabled) {
          background-color: ${colorValueDarken};
          transform: scale(1.05);
        }
        &:active:not(:disabled) {
          transform: scale(0.95);
        }
        &:disabled {
          background-color: ${color.medium};
          color: ${color.mediumdark};
          transition: none;
          cursor: not-allowed;
        }
      `}

   ${(props): false | FlattenInterpolation<ThemedStyledProps<Props, unknown>> =>
     props.renderAs === 'a' &&
     css`
       border: none;
       text-decoration: underline;
       height: fit-content;
       background-color: transparent;
       color: ${colorValueDarken};
       display: inline-block;
       ${(props): false | FlattenSimpleInterpolation =>
         !props.icon &&
         css`
           height: fit-content;
           padding: 0;
         `}
       .button-icon {
         background-color: ${colorValue};
       }
       &:hover {
         background-color: transparent !important;
         color: ${colorValueDarken}!important;
       }
     `}
`;
