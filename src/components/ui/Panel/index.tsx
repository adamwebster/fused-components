import React, { useState, useEffect } from "react";
import {
  StyledPanel,
  DialogTitle,
  DialogContent,
  DialogText,
  DialogFooter,
  CloseButton,
  Overlay,
} from "./style";
import { Button } from "../Button";
import { color } from "../../../styles/styles";
import { Icon } from "../../icon";

export interface Props {
  /** Set the style for the panel */
  fcStyle?: 'danger' | 'warning' | 'info' | 'success',
  /** Set the tile for the panel */
  title?: string,
  /** What should happen when the close button is clicked */
  onCloseClick: (e: any) => void,
  /** If the panel should have a fixed position */
  fixed?: boolean,
  /** If the panel is visible */
  visible?: boolean,
  children: any,
  /** The position of the panel */
  position?: 'left' | 'right',
  /** If the overlay is shown */
  showOverlay?: boolean,
}
export const Panel = ({
  fcStyle,
  title,
  onCloseClick = (e) => {},
  fixed = true,
  visible = true,
  children,
  position = 'right',
  showOverlay = false,
}:Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setShow(false);
      }, 500);
    } else {
      setShow(true);
    }
  }, [visible]);

  return (
    show && (
      <>
        {showOverlay && <Overlay onClick={(e: any) => onCloseClick(e)}></Overlay>}
          <StyledPanel position={position} visible={visible} fixed={fixed}>
            <DialogTitle fcStyle={fcStyle}>
              {title && title}
              <CloseButton onClick={(e: any) => onCloseClick(e)} aria-label="Close">
                <Icon icon="times" />
              </CloseButton>
            </DialogTitle>
            <DialogContent>
              <DialogText>{children}</DialogText>
            </DialogContent>
            <DialogFooter>
              <Button
                buttonColor={color.mediumdark}
                onClick={(e) => onCloseClick(e)}
              >
                Close
              </Button>
              <Button fcStyle={fcStyle} primary>
                Save
              </Button>
            </DialogFooter>
          </StyledPanel>
      </>
    )
  );
};
