import styled from "styled-components";
import variables from "../../../styles/variables";

export const StyledBadge = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  border: solid 1px ${variables.borderColor};
  width: fit-content;
  background-color: ${props => {
    switch (props.fcStyle) {
      case "danger":
        return variables.dangerBG;
      case "warning":
        return variables.warningBG;
      case "info":
        return variables.infoBG;
      case "success":
        return variables.successBG;
      default:
        return "#ccc";
    }
  }};

  border: solid 1px
    ${props => {
      switch (props.fcStyle) {
        case "danger":
          return variables.dangerBorder;
        case "warning":
          return variables.warningBorder;
        case "info":
          return variables.infoBorder;
        case "success":
          return variables.successBorder;
        default:
          return '#666';
      }
    }};
  color: ${props => {
    switch (props.fcStyle) {
      case "danger":
        return variables.dangerText;
      case "warning":
        return variables.warningText;
      case "info":
        return variables.infoText;
      case "success":
        return variables.successText;
      default:
        return '#666';
    }
  }};
`;
