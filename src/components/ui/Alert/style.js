import styled from "styled-components";
import variables from '../../../styles/variables';

export const StyledAlert = styled.div`
  background-color: ${
  props => {
    switch (props.fcStyle) {
      case 'danger':
        return props.theme.dangerBG
      case 'warning':
        return props.theme.warningBG
      case 'info':
        return props.theme.infoBG
      case 'success':
        return props.theme.successBG
      default:
        return props.theme.dangerBG
    }
  }
  };
  border: solid 1px ${
  props => {
    switch (props.fcStyle) {
      case 'danger':
        return props.theme.dangerBorder
      case 'warning':
        return props.theme.warningBorder
      case 'info':
        return props.theme.infoBorder
      case 'success':
        return props.theme.successBorder
      default:
        return props.theme.dangerBorder
    }
  }
  };
  color: ${
  props => {
    switch (props.fcStyle) {
      case 'danger':
        return props.theme.dangerText
      case 'warning':
        return props.theme.warningText
      case 'info':
        return props.theme.infoText
      case 'success':
        return props.theme.successText
      default:
        return props.theme.dangerText
    }
  }
  };
  padding: 10px;
  border-radius: ${props => props.borderRadius ? props.borderRadius : variables.borderRadius}
`