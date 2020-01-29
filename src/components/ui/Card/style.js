import variables from "../../../styles/variables";
import styled, { css } from "styled-components";

export const StyledCard = styled.div`
  border-radius: ${props =>
    props.borderRadius ? props.borderRadius : variables.borderRadius};
  background-color: ${props => props.theme.cardColor};
  border: solid 1px ${props => props.theme.borderColor};
   ${props => props.padding && css`
   padding: ${props.padding};
   `};
  box-sizing: border-box;
  ${props =>
    props.boxShadow &&
    css`
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    `}
`;
