import styled from "styled-components";
import { color } from "../../../styles/styles";
import { fcStyles } from "../../../common/types";

export interface Props {
  /** Set the style of the badge */
  fcStyle?: fcStyles;
  theme: any;
}
export const StyledBadge = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  width: fit-content;
  background-color: ${props =>
    props.theme === "dark" ? color.darkModeDarker : "transparent"};
  border: solid 1px
    ${(props: Props) => {
      switch (props.fcStyle) {
        case "danger":
          return color.red;
        case "warning":
          return color.yellow;
        case "info":
          return color.blue;
        case "success":
          return color.green;
        default:
          props.theme === "dark" ? color.medium : "#333";
      }
    }};
  color: ${props => (props.theme === "dark" ? color.medium : "#333")};
`;
