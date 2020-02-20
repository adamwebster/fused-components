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
  fcStyle?: string,
  title?: string,
  onCloseClick: (e: any) => void,
  fixed?: boolean,
  visible?: boolean,
  children: any,
  position?: string,
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
                onClick={(e: any) => onCloseClick(e)}
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
