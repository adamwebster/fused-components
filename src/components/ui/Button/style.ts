import styled, {
  css,
  FlattenInterpolation,
  SimpleInterpolation,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { color } from '../../../styles/styles';
import { darken } from 'polished';
import { fcStyles } from '../../../common/types';

interface ColorProps {
  theme?: unknown;
  buttonColor?: string;
  fcStyle?: fcStyles;
  icon?: string;
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

const primaryColorValue = (props: ColorProps): string => {
  switch (props.fcStyle) {
    case 'danger':
      return color.dangerButton;
    case 'warning':
      return color.warningButton;
    case 'info':
      return color.infoButton;
    case 'success':
      return color.successButton;
    default:
      return props.buttonColor || color.primaryButton;
  }
};

const primaryColorValueHover = (props: ColorProps): string => {
  switch (props.fcStyle) {
    case 'danger':
      return darken(0.1, color.dangerButton);
    case 'warning':
      return darken(0.1, color.warningButton);
    case 'info':
      return darken(0.1, color.infoButton);
    case 'success':
      return darken(0.1, color.successButton);
    default:
      return darken(0.1, props.buttonColor || color.primaryButton);
  }
};

const colorValueDarken = (props: ColorProps): string => {
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

const primaryFontColor = (props: ColorProps): string => {
  switch (props.fcStyle) {
    case 'warning':
      return color.warningButtonFont;
    default:
      return '#fff';
  }
};

interface SI {
  primary?: boolean;
  fcStyle?: fcStyles;
}

export const StyledIcon = styled.span<SI>`
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
  ${(props): false | FlattenInterpolation<ThemedStyledProps<ColorProps, unknown>> =>
    !props.primary &&
    css`
      background-color: ${colorValue};
    `}
`;

interface SB extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: string;
  buttonColor?: string;
  disabled?: boolean;
  primary?: boolean;
  fcStyle?: fcStyles;
  theme?: unknown;
  as?: string;
}
export const StyledButton = styled.button<SB>`
  vertical-align: middle;
  padding: 0 10px;
  box-sizing: border-box;
  height: 34px;
  cursor: pointer;
  position:relative;
  border-radius: 5px;
  transition: all 0.2s ease;
  ${(props): false | FlattenInterpolation<ThemedStyledProps<ColorProps, unknown>> =>
    !props.primary &&
    css`
      background-color: transparent;
      color: ${({ theme }): SimpleInterpolation => (theme === 'dark' ? color.darkModeLightest : '#000')};
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
        background-color: ${primaryColorValue};
        border: none;
        color: ${primaryFontColor};
        &:hover:not(:disabled) {
          background-color: ${primaryColorValueHover};
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

   ${(props): false | FlattenInterpolation<ThemedStyledProps<ColorProps, unknown>> =>
     props.as === 'a' &&
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
           padding: 0;
         `}
       .button-icon {
         background-color: ${colorValue};
         padding: 4px 5px;
         text-align: center;
       }
       &:hover {
         background-color: transparent !important;
         color: ${colorValueDarken}!important;
       }
     `}
`;
