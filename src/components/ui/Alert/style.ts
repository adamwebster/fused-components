import styled, { css } from "styled-components";
import { color } from '../../../styles/styles';
import { Props } from './'

export const StyledAlert = styled.div`

  background-color: ${props => (props.theme === 'dark') ? color.darkModeBG : '#fff'};
  color: ${props => (props.theme === 'dark') ? color.medium : color.darker};

  border-style: solid;
  border-width: 5px 1px 1px 1px;
  border-color: ${
  (props: Props) => {
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
  (props: Props) => {
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
  padding: 10px;
  ${(props: Props) => props.borderRadius && css`border-radius: 5px;`}
`

export const Title = styled.span`
top: -5px;
position: relative;
`

export const AlertContent = styled.div`
margin-top: 10px;
`
