import styled, { css } from "styled-components";
import { color } from "../../../styles/styles";
import { fcStyles } from "../../../common/types";
import { darken, lighten } from "polished";

interface Props {
  /** Set the style of the badge */
  fcStyle?: fcStyles;
  theme?: any;
}

const colorValue = (props: Props) => {
  switch (props.fcStyle) {
    case "danger":
      return color.red;
    case "warning":
      return color.yellow;
    case "info":
      return color.blue;
    case "success":
      return color.green;
    default:
      return props.theme === "dark" ? color.medium : color.dark
  }
};
export interface IStyledPanel extends React.HTMLProps<HTMLDivElement>{
  fixed: boolean,
  position: 'left' | 'right',
  visible: boolean,
}
export const StyledPanel = styled.div<IStyledPanel>`
  border-radius: 5px;
  background-color: ${props => (props.theme === 'dark') ? color.darkModeBG : '#fff'};
  color: ${props => (props.theme === 'dark') ? color.medium : color.darker};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  height: calc(100vh - 50px);
  width: 300px;
  display: flex;
  flex-flow: column;
  z-index: 99;
  ${props =>
    props.fixed
      ? css`
          position: fixed;
          top: 25px;
          ${props.position === "right" ? "right: 25px;" : "left: 25px;"}
          animation: ${
            !props.visible
              ? `${
                  props.position === "right" ? "bounceout" : "bounceoutleft"
                } 0.5s ease-in-out`
              : `${
                  props.position === "right" ? "bouncein" : "bounceinleft"
                } 0.5s ease-in-out`
          };
          `
      : css`
          position: relative;
          margin-right: 25px;
        `}

  @keyframes bouncein {
    0% {
      right: -400px;
    }
    100% {
      right: 25px;
    }
  }

  @keyframes bounceinleft {
    0% {
      left: -400px;
    }
    100% {
      left: 25px;
    }
  }

  @keyframes bounceoutleft {
    0% {
      left: 25px;
    }
    100% {
      left: -400px;
    }
  }

  @keyframes bounceout {
    0% {
      right: 25px;
    }
    100% {
      right: -400px;
    }
  }
`;

export interface IDialogTile extends React.HTMLProps<HTMLDivElement> {
  fcStyle?: fcStyles,
  children: any
}

export const DialogTitle = styled.h3<IDialogTile>`
  border-bottom:  solid 1px ${props => (props.theme === 'dark') ? lighten(1, color.border) : color.border};
  padding: 10px;
  box-sizing: border-box;
  margin: 0;
  height: fit-content;

  color: ${(props: IDialogTile) => colorValue(props)};
`;

export const DialogContent = styled.div`
  padding: 20px 10px;
  box-sizing: border-box;
  display: flex;
  flex: 1 1;
  overflow: auto;
  p:first-of-type {
    margin-top: 0;
  }
`;

export const DialogText = styled.div``;

export const DialogFooter = styled.div`
  border-top:  solid 1px ${props => (props.theme === 'dark') ? lighten(1, color.border) : color.border};
  padding: 10px;
  box-sizing: border-box;
  text-align: right;
  height: fit-content;
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
  color: ${props => (props.theme === 'dark') ? color.darkModeButton : color.mediumdark};  position: absolute;
  cursor: pointer;
  &:hover {
    color: ${props => (props.theme === 'dark') ? darken(0.2,color.darkModeButton) : color.dark};  
  }
  svg {
    width: 16px;
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
  animation: fadeIn 0.1s;  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`
