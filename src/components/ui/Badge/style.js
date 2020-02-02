import styled from "styled-components";
import {color} from '../../../styles/styles';

export const StyledBadge = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  width: fit-content;
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

  border: solid 1px
    ${  props => {
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
  }};
  color:#333;
`;
