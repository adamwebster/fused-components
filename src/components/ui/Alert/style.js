import styled, {css} from "styled-components";
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
        return '#efefef'
    }
  }
  };
  border-style: solid;
  border-width: 1px 1px 1px 5px;
  border-color: ${
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
        return '#333'
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
        return '#333'
    }
  }
  };
  padding: 10px;
  ${props => props.borderRadius && css`border-radius: 5px`}
`