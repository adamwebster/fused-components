import styled, { css } from "styled-components";
import { darken } from "polished";
import variables from "../../../styles/variables";

export const Button = styled.button`
  background-color: transparent;
  color: ${props => props.theme.accentColor};
  border: solid 1px ${props => props.theme.accentColor};
  border-radius: ${variables.borderRadius};
  padding: 5px 10px;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  outline: 0;
  position: relative;

  &:hover:not([disabled]) {
    border-color: ${props => darken(0.2, props.theme.accentColor)};
    color: ${props => darken(0.2, props.theme.accentColor)};
    transform: scale(1.02);
    ${props =>
      !props.primary &&
      css`
        .button-icon {
          background-color: ${props => darken(0.2, props.theme.accentColor)};
        }
      `}
  }

  ${props =>
    props.primary &&
    css`
      background-color: ${props => props.theme.accentColor};
      color: ${props => props.theme.buttonTextColor};
      border: none;
      ${props =>
        !props.completed &&
        css`
          &:hover:not([disabled]) {
            background-color: ${props => darken(0.1, props.theme.accentColor)};
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
            color: #fff;
          }
        `}
    `}

  &[disabled] {
    background-color: #ccc;
    color: #a0a0a0;
    border: none;
    cursor: default;
  }

  &.transforming {
    width: 34px;
    margin: 0 auto;
    border-radius: 50%;
  }

  ${props =>
    props.loading &&
    !props.completed &&
    css`
    text-indent: -9999px;                 /* sends the text off-screen */
    white-space: nowrap;            /* because only the first line is indented */
    width:34px;
    margin: 0 auto;
    border-radius: 50%;
    content: "";
    //border:solid 5px ${props => props.theme.accentColor};
    background: transparent;
    animation:spin 1s linear infinite;
    animation-delay: .2s;
    &[disabled]{
        background-color: transparent;
    }
    &:after{
      content:"";
      width: 28px;
      height: 28px;
      background-color: ${props => props.theme.cardColor};
      border-radius:50%;
      display:block;
      position: relative;
      left:-7px;
      top: -15px;    
    }
  }
`}
  ${props =>
    props.completed &&
    css`
      width: 100%;
      background-color: ${props => props.theme.green};
      color: #fff;
      border: none;

      &:disabled {
        background-color: ${props => props.theme.green};
        color: #fff;
        border: none;
      }
    `}
 
  @keyframes spin {
    100% {
      background: conic-gradient(${props => props.theme.accentColor}, #fff);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .button-icon {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 5px;
    border-radius: 50%;
    position: absolute;
    left: 5px;
    top: 5px;
    color: #fff;
    ${props =>
      !props.primary &&
      css`
        background-color: ${props => props.theme.accentColor};
      `}
  }
`;