import styled from "styled-components";
import variables from '../../../styles/variables';

export const StyledAlert = styled.div`
  background-color: ${
  props => {
    switch (props.fcStyle) {
      case 'danger':
        return variables.dangerBG
      case 'warning':
        return variables.warningBG
      case 'info':
        return variables.infoBG
      case 'success':
        return variables.successBG
      default:
        return variables.dangerBG
    }
  }
  };
  border: solid 1px ${
  props => {
    switch (props.fcStyle) {
      case 'danger':
        return variables.dangerBorder
      case 'warning':
        return variables.warningBorder
      case 'info':
        return variables.infoBorder
      case 'success':
        return variables.successBorder
      default:
        return variables.dangerBorder
    }
  }
  };
  color: ${
  props => {
    switch (props.fcStyle) {
      case 'danger':
        return variables.dangerText
      case 'warning':
        return variables.warningText
      case 'info':
        return variables.infoText
      case 'success':
        return variables.successText
      default:
        return variables.dangerText
    }
  }
  };
  padding: 10px;
  border-radius: ${props => props.borderRadius ? props.borderRadius : variables.borderRadius}
`