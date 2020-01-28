import styled, {css} from 'styled-components';
import variables from "../../../styles/variables";

export const StyledButton = styled.button`
   background-color: transparent;
  color: ${props => props.theme.accentColor};
  border: solid 1px ${props => props.theme.accentColor};
  border-radius: ${props => props.borderRadius ? props.borderRadius : variables.borderRadius};
  padding: 5px 10px;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  cursor: pointer;
  display: block;
  outline: 0;
  ${props => props.buttonColor && css`
    border-color: ${props.buttonColor};
    color: ${props.buttonColor};
  `}

  ${props =>
    props.primary &&
    css`
      background-color: ${props => props.theme.accentColor};
      color: ${props => props.theme.buttonTextColor};
      border: none;
  `}
`