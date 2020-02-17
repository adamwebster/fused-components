import styled, { css } from "styled-components";
import { color } from "../../../styles/styles";

const colorValue = props => {
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
};

const borderColor = props => {
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
          return color.border
    }
  };

export const StyledDialog = styled.div`
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "5px")};
  background-color: ${color.lightest};
  border: solid 1px ${borderColor};
  z-index: 99;
  width: 500px;
  left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  ${props =>
    props.fixed
      ? css`
          position: fixed;
          margin: 0 auto;
       
          animation: ${!props.visible
            ? "hide 0.2s ease-in-out"
            : "popin 0.2s"};
        `
      : css`
          position: relative;
          margin-right: 25px;
        `}

  @keyframes popin {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
    }
    70% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    85% {
      transform: translate(-50%, -50%) scale(0.95);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  ${props =>
    props.boxShadow &&
    css`
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
    `}
`;

export const DialogTitle = styled.div`
  border-bottom: solid 1px ${color.border};
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  h2{
    margin: 0;
    color: ${colorValue};
  }
`;

export const DialogContent = styled.div`
  padding: 10px;
  box-sizing: border-box;
`;

export const DialogFooter = styled.div`
  border-top: solid 1px ${color.border};
  padding: 10px;
  box-sizing: border-box;
  text-align: right;
  button {
    display: inline-block;
    &:last-child {
      margin-left: 10px;
    }
  }
`;

export const CloseButton = styled.button`
  right: 15px;
  top: 12px;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  font-weight: bold;
  color: ${color.mediumdark};
  position: absolute;
  cursor: pointer;
  &:hover {
    color: ${color.dark};
  }
  svg {
    width: 16px;
    &:hover {
      color: ${color.dark};
    }
  }
`;


export const Overlay = styled.div`
  background-color: ${color.overlay};
  position:fixed;
  width: 100vw;
  height: 100vh;
  left:0;
  top: 0;
  z-index: 99;
  animation: fadeIn 0.5s;  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`
