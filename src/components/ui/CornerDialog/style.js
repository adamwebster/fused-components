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
export const CornerDialogStyled = styled.div`
  max-width: 320px;
  ${props =>
    props.fixed
      ? css`
          position: fixed;
          bottom: 25px;
          right: 25px;
          animation: bounceup 0.5s ease-in-out;
        `
      : css`
          position: relative;
          margin-right: 25px;
        `}
  background-color: #fff;
  border-radius: 5px;
  border: solid 1px ${borderColor};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  z-index: 99;

  @keyframes bounceup {
    0% {
      bottom: -200px;
    }
    50% {
      bottom: 50px;
    }
    60% {
      bottom: 0;
    }
    100% {
      bottom: 25px;
    }
  }
`;

export const DialogTitle = styled.h3`
  border-bottom: solid 1px ${color.border};
  padding: 10px;
  box-sizing: border-box;
  margin: 0;
  color: ${colorValue}

`;

export const DialogContent = styled.div`
  padding: 20px 10px;
  box-sizing: border-box;
  display: flex;
`;

export const DialogText = styled.div``;

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
  right: 10px;
  top: 10px;
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

export const IconStyled = styled.div`
  margin-right: 15px;
  display: block;
  svg {
    width: 32px;
    color: ${colorValue}
  }
`;
