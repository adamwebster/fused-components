import styled from "styled-components";
import {color} from '../../../styles/styles';
import {Props} from './'

export const StyledBadge = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  width: fit-content;

  border: solid 1px
    ${(props:Props) => {
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
