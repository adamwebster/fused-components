import styled from "styled-components";
import { Alert } from "../Alert/";
import { color } from "../../../styles/styles";

export const ToastContainer = styled.div`
  position: fixed;
  width: 500px;
  ${props => {
    let position = "";

    switch (props.position) {
      case "top":
        position = `
            top:20px;
            left: 50%;
            transform: translateX(-50%);
            `;
        break;
      case "bottom":
        position = `
             bottom:20px;
            left: 50%;
            transform: translateX(-50%);
            `;
        break;

      case "bottom-right":
        position = `
        bottom:20px;
        right:20px;
            `;
        break;
      case "top-right":
      default:
        position = `
        top:20px;
        right:20px;
            `;
    }
    return [position];
  }}

  z-index:99;
`;

export const StyledToast = styled(Alert)`
  margin-bottom: 10px;
  transition: all;
  position: relative;
  animation: ${props =>
    !props.removing
      ? "fadeinToast 0.5s ease-in-out"
      : "fadeoutToast 0.5s ease-in-out"};
  @keyframes fadeinToast {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeoutToast {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
`;

export const LoadingBar = styled.div`
  position: relative;
  height: 5px;
  transition: all;
  margin-top: 10px;
  background-color: ${color.medium};
  width: ${props => props.timer}%;
`;

export const CloseButton = styled.button`
  width: 12px;
  box-sizing: border-box;
  padding: 0;
  border: none;
  color: ${color.mediumdark};
  background-color: transparent;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  &:hover {
    color: ${color.dark};
  }
  svg {
    color: inherit;
  }
`;
