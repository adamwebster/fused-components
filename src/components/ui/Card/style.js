import {color} from "../../../styles/styles";
import styled, { css } from "styled-components";

export const StyledCard = styled.div`
  border-radius: ${props =>
    props.borderRadius ? props.borderRadius : '5px'};
  background-color: ${color.lightest};
  border: solid 1px ${color.border};
  box-sizing: border-box;
  ${props =>
    props.boxShadow &&
    css`
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    `}
`;
