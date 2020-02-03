import styled, { css } from "styled-components";
import { color } from "../../../styles/styles";
import { darken } from "polished";

export const StyledButton = styled.button`
   
  padding: 5px 10px;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  cursor: pointer;
  display: block;
  outline: 0;
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "5px")};

  ${props =>
    !props.primary &&
    css`
      background-color: transparent;
      color: ${color.primary};
      border: solid 1px ${color.primary};
      &:hover {
        color: ${color.light};
        background-color: ${color.primary};
        border-color: ${darken(0.1, color.primary)};
      }
    `}

  ${props =>
    props.buttonColor &&
    css`
      border-color: ${props.buttonColor};
      color: ${props.buttonColor};
    `}
  ${props =>
    props.primary &&
    css`
      background-color: ${color.primary};
      color: ${color.light};
      border: none;
      &:hover {
        background-color: ${darken(0.1, color.primary)};
      }
    `}
`;
