import styled, {css} from "styled-components";
import {color} from '../../../styles/styles';

export const StyledAlert = styled.div`
  background-color: ${
  props => {
    switch (props.fcStyle) {
      case 'danger':
        return color.danger
      case 'warning':
        return color.warning
      case 'info':
        return color.info
      case 'success':
        return color.success
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
        return color.red
      case 'warning':
        return color.yellow
      case 'info':
        return color.blue
      case 'success':
        return color.green
      default:
        return '#333'
    }
  }
  };
  color: #333;
  padding: 10px;
  ${props => props.borderRadius && css`border-radius: 5px`}
`