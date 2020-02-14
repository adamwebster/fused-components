import styled, { css } from "styled-components";
import { color } from "../../../styles/styles";
import { darken } from "polished";

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
      color: ${props.buttonColor || color.primary};
      border: solid 1px ${props.buttonColor || color.primary};
      &:hover:not(:disabled) {
        color: ${darken(0.1, props.buttonColor || color.primary)};
        border-color: ${darken(0.1, props.buttonColor || color.primary)};
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
      background-color: ${props.buttonColor || color.primary};
      color: ${color.light};
      border: none;
      &:hover:not(:disabled) {
        background-color: ${darken(0.1, props.buttonColor || color.primary)};
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
    padding: 5px 7px;
    border-radius: 50%;
    position: absolute;
    left: 5px;
    box-sizing: border-box;
    top: 5px;
    width: 24px;
    height: 24px;
    color: #fff;
    ${props =>
    (!props.primary && !props.completed) &&
    css`
        background-color: ${props => props.buttonColor || color.primary};
      `}
  }
`;
