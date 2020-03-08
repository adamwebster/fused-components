import styled, { css } from "styled-components";
import { color } from '../../../styles/styles';
import { fcStyles } from "../../../common/types";

interface Props {
  /** Set the style of the badge */
  fcStyle?: fcStyles;
  theme: any;
  borderRadius: any
}

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
      return props.theme === "dark" ? color.medium : color.dark
    }
  }
  };
  h4{
    margin-top:0;
    margin-bottom: 10px;
    display: inline-flex;
    align-content: center;
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
       return props.theme === "dark" ? color.medium : color.dark
    }
  }
  };
  svg{
    width:20px;
    min-width: 20px;
    height: 20px;
    margin-right:5px;
  }
  }
  padding: 10px;
  ${(props: Props) => props.borderRadius && css`border-radius: 5px;`}
`

export const Title = styled.span`
top: -5px;
margin-left: 5px;
display: inline-block;
`

export const AlertContent = styled.div`

`
