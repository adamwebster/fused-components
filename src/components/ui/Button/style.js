import styled, { css } from "styled-components";
import { color } from "../../../styles/styles";
import { darken } from "polished";

  
const colorValue = props => {
  switch (props.fcStyle) {
    case 'danger':
        return color.red
      case 'warning':
        return color.yellow
      case 'info':
        return color.blue
      case 'success':
        return color.green
      default:
        return props.buttonColor || color.primary
  }
};

const colorValueDarken = props => {
  switch (props.fcStyle) {
    case 'danger':
        return darken(0.1, color.red)
      case 'warning':
        return darken(0.1, color.yellow)
      case 'info':
        return darken(0.1, color.blue)
      case 'success':
        return darken(0.1, color.green)
      default:
        return darken(0.1, props.buttonColor || color.primary)
  }
};

export const StyledButton = styled.button`
   
  padding: 5px 10px;
  box-sizing: border-box;
  height: 34px;
  cursor: pointer;
  display: block;
  position:relative;
  outline: 0;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "5px")};
  transition: all 0.2s ease;

  ${props =>
    !props.primary &&
    css`
      background-color: transparent;
      color: ${'inherit' || color.primary};
      border: solid 1px ${colorValue};
      &:hover:not(:disabled) {
        color: 'inherit' || ${darken(0.1, color.primary)};
        border-color: ${colorValueDarken};
        transform: scale(1.05);
      }
      &:active:not(:disabled){
        transform: scale(0.95);
      }
      &:disabled{
        border-color: ${color.mediumdark};
        color: ${color.mediumdark};
        transition:none;
        cursor: not-allowed;
      }
    `}
  ${props =>
    props.primary &&
    css`
      background-color: ${colorValue};
      color: ${color.light};
      border: none;
      &:hover:not(:disabled) {
        background-color: ${colorValueDarken};
        transform: scale(1.05);
      }
      &:active:not(:disabled){
        transform: scale(0.95);
      }
      &:disabled{
        background-color: ${color.medium};
        color: ${color.mediumdark};
        transition:none;
        cursor: not-allowed;
      }
    `}

    ${props => props.icon && css`
      padding-left: 34px;
    `}
    .button-icon {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 5px;
    border-radius: 50%;
    position: absolute;
    left: 5px;
    box-sizing: border-box;
    top: ${props => props.primary ? '5px' : '4px'};
    width: 24px;
    height: 24px;
    color: #fff;
    ${props =>
    (!props.primary && !props.completed) &&
    css`
        background-color: ${colorValue};
      `}
  }
`;
