import React from "react";
import { Button } from "../Button";
import {
  StyledDialog,
  DialogTitle,
  DialogContent,
  CloseButton,
  DialogFooter,
  Overlay
} from "./style";
import { color } from "../../../styles/styles";
import { Icon } from "../../icon";

export interface Props {
  boxShadow?: boolean,
  title: string,
  visible: boolean,
  confirmText?: string,
  onCloseClick: () => void;
  fixed?: boolean,
  fcStyle: string,
  showOverlay?: boolean,
  cancelText?: string,
  children: any,
}
export const Dialog = ({
  boxShadow = true,
  title,
  visible = false,
  confirmText = "Yes",
  children,
  onCloseClick = () => {},
  fixed = true,
  fcStyle,
  showOverlay = true,
  cancelText = "Cancel"
}:Props) => {
  return (
    <>
      {visible && (
        <>
          {showOverlay && <Overlay onClick={() => onCloseClick()} />}
          <StyledDialog fcStyle={fcStyle} visible={visible} fixed={fixed} boxShadow={boxShadow}>
            <DialogTitle fcStyle={fcStyle}> 
              <h2>{title}</h2>
              <CloseButton aria-label="Close" onClick={() => onCloseClick()}>
                <Icon icon="times" />
              </CloseButton>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogFooter>
              <Button
                buttonColor={color.mediumdark}
                onClick={() => onCloseClick()}
              >
                {cancelText}
              </Button>

              <Button primary fcStyle={fcStyle}>{confirmText}</Button>
            </DialogFooter>
          </StyledDialog>
        </>
      )}
    </>
  );
};
