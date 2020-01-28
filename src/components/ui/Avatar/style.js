import styled, { css } from "styled-components";
import variables from "../../../styles/variables";

export const StyledAvatar = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props =>
    props.borderRadius ? props.borderRadius : variables.borderRadius};
  background-image: url(${props => props.image});
  background-size: cover;
  ${props =>
    props.boxShadow &&
    css`
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    `}
`;
