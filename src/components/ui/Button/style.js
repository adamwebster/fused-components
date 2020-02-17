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
  vertical-align: middle;
  padding: 0 10px;
  box-sizing: border-box;
  height: 34px;
  cursor: pointer;
  outline: 0;
  position:relative;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "5px")};
  transition: all 0.2s ease;
  ${props =>
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
    .button-icon {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 5px;
    margin-right: 5px;
    border-radius: 50%;
    display:inline-block;
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    vertical-align:middle;
    color: #fff;
    ${props =>
    (!props.primary && !props.completed) &&
    css`
        background-color: ${colorValue};
      `}
    }
   ${props => props.as === 'a' && css`
    border:none;
    text-decoration:underline;
    height: fit-content;
    background-color: transparent;
    color: ${colorValueDarken};
    display:inline-block;
    ${props => !props.icon && css`
      height:fit-content;
      padding: 0;
    `}
    .button-icon {
      background-color: ${colorValue};
    }
    &:hover{
      background-color:transparent!important;
      color: ${colorValueDarken}!important;
    }
   `}
`;
