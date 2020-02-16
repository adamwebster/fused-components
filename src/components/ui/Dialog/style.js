import styled, { css } from "styled-components";
import { color } from "../../../styles/styles";

export const StyledDialog = styled.div`
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "5px")};
  background-color: ${color.lightest};
  border: solid 1px ${color.border};
  z-index: 99;
  max-width: 500px;
  ${props =>
    props.fixed
      ? css`
          position: fixed;
          margin: 0 auto;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: ${!props.visible
            ? "hide 0.2s ease-in-out"
            : "fadein 0.5s ease-in-out"};
        `
      : css`
          position: relative;
          margin-right: 25px;
        `}

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
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
  right: 20px;
  top: 20px;
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
