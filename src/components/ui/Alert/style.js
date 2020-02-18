import styled, {css} from "styled-components";
import {color} from '../../../styles/styles';

export const StyledAlert = styled.div`
  background-color: #fff;
  border-style: solid;
  border-width: 5px 1px 1px 1px;
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
        return color.dark
    }
  }
  };
  h4{
    margin-top:0;
    margin-bottom: 0;
    color: ${
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
        return color.dark
    }
  }
  };
  svg{
    width:20px;
  }
  }
  color: ${color.darker};
  padding: 10px;
  ${props => props.borderRadius && css`border-radius: 5px;`}
`

export const Title = styled.span`
top: -5px;
position: relative;
`

export const AlertContent = styled.div`
margin-top: 10px;
`