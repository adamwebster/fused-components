import styled, { css } from 'styled-components';
import { BaseButton, ButtonSizes, ButtonTypes } from './types';

export interface StyledButtonProps extends BaseButton {}

const getButtonPadding = (buttonSize: ButtonSizes) => {
  switch (buttonSize) {
    case 'small':
      return '4px 8px';
    case 'large':
      return '12px 24px';
    case 'medium':
    default:
      return '8px 16px';
  }
};

const getFontSize = (buttonSize: ButtonSizes) => {
  switch (buttonSize) {
    case 'large':
      return '16px';
    case 'medium':
    case 'small':
    default:
      return '14px';
  }
};
export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme, buttonType }) => theme.buttons[buttonType as ButtonTypes].backgroundColor};
  color: ${({ theme, buttonType }) => theme.buttons[buttonType as ButtonTypes].textColor};
  border: solid 1px ${({ theme, buttonType }) => theme.buttons[buttonType as ButtonTypes].borderColor};
  padding: ${({ buttonSize }) => getButtonPadding(buttonSize as ButtonSizes)};
  border-radius: 6px;
  cursor: pointer;
  font-size: ${({ buttonSize }) => getFontSize(buttonSize as ButtonSizes)};
  ${({ buttonType }) =>
    buttonType === 'primary' &&
    css`
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.1);
    `}
  &:hover:not(:disabled) {
    background-color: ${({ theme, buttonType }) => theme.buttons[buttonType as ButtonTypes].hoverBackgroundColor};
    color: ${({ theme, buttonType }) => theme.buttons[buttonType as ButtonTypes].hoverTextColor};
    border: solid 1px ${({ theme, buttonType }) => theme.buttons[buttonType as ButtonTypes].hoverBorderColor};
  }
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
  &:active {
    background-color: ${({ theme, buttonType }) => theme.buttons[buttonType as ButtonTypes].activeBackgroundColor};
  }
`;
